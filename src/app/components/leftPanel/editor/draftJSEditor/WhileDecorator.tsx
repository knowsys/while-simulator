import { ContentBlock, ContentState } from 'draft-js';
import { List } from 'immutable';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import {
    createLexer,
    TokenType,
} from '../../../../../core/parser/nearley/tokens';
import { ParserError } from './parserError/ParserError';
import { ParserErrorPopover } from './parserError/ParserErrorPopover';
import './WhileDecorator.css';

export const parserErrorEntityType = 'PARSER_ERROR';
export const activeStatementEntityType = 'ACTIVE_STATEMENT';

export const tokenTypeMap: Record<TokenType, string> = {
    finiteLoopStart: 'keyword',
    whileLoopStart: 'keyword',
    branchStart: 'keyword',
    branchThen: 'keyword',
    loopDo: 'keyword',
    loopEnd: 'keyword',
    notEqual: 'operator',
    assign: 'operator',
    semicolon: 'other',
    plus: 'operator',
    minus: 'operator',
    identifier: 'identifier',
    zeroIntegerLiteral: 'literal',
    nonZeroIntegerLiteral: 'literal',
    singleLineComment: 'comment',
    whitespace: 'other',
    newLine: 'other',
    error: 'error',
    endOfFile: 'other',
};

export class WhileDecorator {
    private readonly lexer = createLexer();

    getDecorations(block: ContentBlock, contentState: ContentState) {
        const blockText = block.getText();
        const decorations: string[] = Array(blockText.length).fill(null);

        this.lexer.reset(blockText);

        try {
            for (const token of this.lexer) {
                const type = token.type as TokenType;
                for (let i = 0; i < token.value.length; i++) {
                    decorations[token.offset + i] = tokenTypeMap[type];
                }
            }
        } catch (error) {
            console.error('[WhileDecorator] Lexer error: ', error);
        }

        this.decorateEntities(block, contentState, decorations);

        return List(decorations);
    }

    getComponentForKey(key: string) {
        return function (props: any) {
            const popover = (
                <Popover id="while-decorator-parser-error-popover">
                    <ParserErrorPopover></ParserErrorPopover>
                </Popover>
            );
            return (
                <span
                    className={
                        'while-decorator-token while-decorator-token-' +
                        key.split('-')[0]
                    }
                >
                    {key.includes(parserErrorEntityType) ? (
                        <OverlayTrigger
                            trigger={['focus', 'hover']}
                            placement="bottom-start"
                            overlay={popover}
                        >
                            <span>
                                <ParserError>{props.children}</ParserError>
                            </span>
                        </OverlayTrigger>
                    ) : key.includes(activeStatementEntityType) ? (
                        <span className="while-decorator-active-statement">
                            {props.children}
                        </span>
                    ) : (
                        props.children
                    )}
                </span>
            );
        };
    }

    getPropsForKey(_key: string) {
        return {};
    }

    decorateEntities(
        block: ContentBlock,
        contentState: ContentState,
        decorations: string[]
    ) {
        for (const entityType of [
            parserErrorEntityType,
            activeStatementEntityType,
        ]) {
            block.findEntityRanges(
                (character) => {
                    const entityKey = character.getEntity();
                    return (
                        entityKey !== null &&
                        contentState
                            .getEntity(character.getEntity())
                            .getType() === entityType
                    );
                },
                (start, end) => {
                    for (let i = start; i < end; i++) {
                        decorations[i] += '-' + entityType;
                    }
                }
            );
        }
    }
}
