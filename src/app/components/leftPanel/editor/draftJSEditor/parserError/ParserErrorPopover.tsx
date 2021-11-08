import { ListGroup, Popover } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { TokenType } from '../../../../../../core/parser/nearley/tokens';
import { useAppSelector } from '../../../../../store';
import { Icon } from '../../../../Icon';

const tokenTypeExamples: Partial<Record<TokenType, string>> = {
    assign: ':=',
    plus: '+',
    minus: '-',
    whileLoopStart: 'WHILE',
    finiteLoopStart: 'LOOP',
    branchStart: 'IF',
    branchThen: 'THEN',
    loopDo: 'DO',
    loopEnd: 'END',
    identifier: 'x1',
    zeroIntegerLiteral: '0',
    nonZeroIntegerLiteral: '123',
    notEqual: '!=',
};

const otherWhitespaceTokens: TokenType[] = [
    'singleLineComment',
    'semicolon',
    'newLine',
    'endOfFile',
];

export function ParserErrorPopover() {
    const { t } = useTranslation('editor');

    const unexpectedTokenType = useAppSelector(
        (state) => state.programInfo.parserError.unexpectedTokenType
    );
    const unexpectedToken = useAppSelector(
        (state) => state.programInfo.parserError.unexpectedToken
    );

    let expectedTokenTypes = useAppSelector(
        (state) => state.programInfo.parserError.expectedTokenTypes
    );
    // Merge whitespace types
    expectedTokenTypes = [
        ...new Set(
            expectedTokenTypes.map((t) =>
                otherWhitespaceTokens.includes(t) ? 'whitespace' : t
            )
        ),
    ];
    // Move whitespace to the bottom
    expectedTokenTypes = expectedTokenTypes.sort();

    return (
        <>
            <Popover.Header>
                {t('unexpectedToken') + ' '}
                <code className="font-monospace fst-italic fw-bold">
                    {unexpectedToken.substring(0, 10)}
                </code>
            </Popover.Header>
            <Popover.Body className="p-0">
                <ListGroup variant="flush">
                    <ListGroup.Item
                        variant="danger"
                        className="position-relative"
                    >
                        <Icon name="x-lg" />{' '}
                        {t('tokenTypes.' + unexpectedTokenType)}
                    </ListGroup.Item>

                    <ListGroup.Item>
                        {t('expectedTheFollowingTokenTypes')}
                    </ListGroup.Item>

                    {expectedTokenTypes.map((tokenType) => (
                        <ListGroup.Item
                            variant="success"
                            className="position-relative"
                            key={tokenType}
                        >
                            <Icon name="check-lg" />{' '}
                            {t('tokenTypes.' + tokenType)}
                            <span className="font-monospace fw-bold float-end">
                                {tokenTypeExamples[tokenType]}
                            </span>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
                <br />
            </Popover.Body>
        </>
    );
}
