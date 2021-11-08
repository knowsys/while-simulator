import { EditorState } from 'draft-js';
import { Configuration } from '../../../core/interpreter/Configuration';
import { TokenType } from '../../../core/parser/nearley/tokens';

export type OrderedVariables = { identifier: string; valueString: string }[];

export interface ExecutorInfo {
    executionStep: number;
    didExecutionFinish: boolean;
    isRunning: boolean;
    lastConfigurations: Configuration[];
}

export interface ProgramInfo {
    initialVariables: OrderedVariables;
    executor: ExecutorInfo;
    isExecutorOutdated: boolean;
    editorState: EditorState;
    activeStatementEntityKey: string;
    parserErrorEntityKey: string;
    parserError: {
        unexpectedTokenType: TokenType;
        expectedTokenTypes: TokenType[];
        unexpectedToken: string;
    };
}
