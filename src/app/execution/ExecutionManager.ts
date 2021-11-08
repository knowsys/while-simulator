import { StatementSequence } from '../../core/ast/StatementSequence';
import { Program } from '../../core/interpreter/Program';
import { NearleyParser } from '../../core/parser/nearley/NearleyParser';
import { TokenType } from '../../core/parser/nearley/tokens';
import { convertOrderedVariables } from '../convertOrderedVariables';
import { BatchExecutor } from './BatchExecutor';
import { RootStore } from '../store';
import { programInfoSlice } from '../store/programInfo';
import { OrderedVariables } from '../store/programInfo/ProgramInfo';

/**
 * Manages the parser and executor
 *
 * Handles restarting the executors and program changes
 */
export class ExecutionManager {
    private parser = new NearleyParser();

    private initialVariables: OrderedVariables = [];
    private program = new Program(new StatementSequence([]));

    public executor?: BatchExecutor;

    constructor(
        private programText: string,
        private readonly store: RootStore,
        private readonly stepsPerExecutionBatch: number,
        private readonly maxConfigurationsToStore: number
    ) {
        if (
            stepsPerExecutionBatch <= 0 ||
            !Number.isInteger(stepsPerExecutionBatch)
        ) {
            throw new Error();
        }

        this.restartExecutor();
    }

    public extractExpectedTokens(errorMessage: string) {
        const tokens: TokenType[] = [];

        let match: RegExpExecArray | null = null;
        const regExp = /\nA (.*?) token based on:/g;

        do {
            match = regExp.exec(errorMessage);
            if (match) {
                const token = match[1] as TokenType;
                if (!tokens.includes(token)) {
                    tokens.push(token);
                }
            }
        } while (match);

        return tokens;
    }

    public handleStoreChange(
        programText: string,
        initialVariables: OrderedVariables
    ) {
        if (
            programText === this.programText &&
            initialVariables === this.initialVariables
        ) {
            return;
        }

        this.programText = programText;
        this.initialVariables = initialVariables;

        this.handleProgramChange();
    }

    private handleProgramChange() {
        this.store.dispatch(programInfoSlice.actions.normalizeEditorState());

        try {
            this.program = new Program(
                this.parser.parseProgramText(this.programText)
            );
            this.store.dispatch(
                programInfoSlice.actions.setParserError({
                    startIndex: 0,
                    endIndex: 0,
                    programText: this.programText,
                    unexpectedTokenType: 'error',
                    expectedTokenTypes: [],
                })
            );
        } catch (error: any) {
            if (error.token) {
                let startIndex = error.token.offset;
                let endIndex = error.token.offset + error.token.value.length;

                if (error.token.type === 'endOfFile') {
                    const lastSymbolAndWhitespace = (this.programText.match(
                        /\S\s*$/
                    ) || [''])[0];

                    startIndex =
                        this.programText.length -
                        lastSymbolAndWhitespace.length;
                    endIndex = this.programText.length;
                }

                this.store.dispatch(
                    programInfoSlice.actions.setParserError({
                        startIndex,
                        endIndex,
                        programText: this.programText,
                        unexpectedTokenType: error.token.type,
                        expectedTokenTypes: this.extractExpectedTokens(
                            error.message
                        ),
                    })
                );
            }
            console.warn('[ExecutionManager] Parse error:', { error });
        }

        this.store.dispatch(
            programInfoSlice.actions.setIsExecutorOutdated(true)
        );
    }

    public restartExecutor(remainingSteps: number | undefined = undefined) {
        this.executor?.stop();

        const onExecutorInfoUpdate = () => {
            if (!this.executor) {
                return;
            }
            this.store.dispatch(
                programInfoSlice.actions.setExecutor({
                    executorInfo: this.executor.getStoreInfo(),
                    programText: this.programText,
                })
            );
        };

        this.executor = new BatchExecutor(
            this.program,
            convertOrderedVariables(this.initialVariables),
            this.stepsPerExecutionBatch,
            10,
            this.maxConfigurationsToStore,
            onExecutorInfoUpdate
        );

        this.executor.setRemainingSteps(remainingSteps);
        this.executor.start();

        this.store.dispatch(
            programInfoSlice.actions.setIsExecutorOutdated(false)
        );
    }
}
