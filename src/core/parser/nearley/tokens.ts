import * as moo from 'moo';

export const tokens = {
    endOfFile: /\$EOF\$ebe91ee6-f3df-11eb-88fe-3af9d3cec4f0/u,
    finiteLoopStart: /LOOP/u,
    whileLoopStart: /WHILE/u,
    branchStart: /IF/u,
    branchThen: /THEN/u,
    loopDo: /DO/u,
    loopEnd: /END/u,
    notEqual: /!=/u,
    assign: /:=/u,
    semicolon: /;/u,
    plus: /\+/u,
    minus: /-/u,
    identifier: /\p{L}[\p{L}0-9]*/u,
    zeroIntegerLiteral: /0+/u,
    nonZeroIntegerLiteral: /[0-9]+/u,
    singleLineComment: /#.*?$/u,
    whitespace: /[^\S\r\n]+/u,
    newLine: { match: /[\r\n]+/u, lineBreaks: true },
    error: moo.error,
};

export type TokenType = keyof typeof tokens;

export function createLexer() {
    return moo.compile(tokens);
}
