import { Assignment } from '../../ast/Assignment';
import { FiniteLoop } from '../../ast/FiniteLoop';
import { WhileLoop } from '../../ast/WhileLoop';
import { Statement, StatementPosition } from '../../ast/Statement';
import { StatementSequence } from '../../ast/StatementSequence';
import { ShorthandStatement } from '../../ast/ShorthandStatement';
import { Branch } from '../../ast/Branch';
import { Token } from 'moo';

/**
 * Generates the statement position based on the first and last argument
 * The first and last argument have to be tokens or statements
 */
function getDefaultPosition(args: any[]): StatementPosition {
    const firstArgument: Statement | Token = args[0];
    const lastArgument: Statement | Token = args[args.length - 1];

    return {
        startIndex:
            firstArgument instanceof Statement
                ? firstArgument.position.startIndex
                : firstArgument.offset,
        endIndex:
            lastArgument instanceof Statement
                ? lastArgument.position.endIndex
                : lastArgument.offset + lastArgument.value.length,
    };
}

export function empty() {
    return null;
}

export function passOnFirst(args: any[]) {
    return args[0];
}

export function passOnSecond(args: any[]) {
    return args[1];
}

export function statementSequence(args: any[]) {
    const statements: Statement[] = [
        ...args[0].map(
            (statementAndSemicolon: [Statement, any]) =>
                statementAndSemicolon[0]
        ),
        args[1],
    ];
    return new StatementSequence(statements);
}

export function plusAssignment(args: any[]) {
    return new Assignment(getDefaultPosition(args), args[0].value, [
        {
            sign: 1,
            valueOrVariableIdentifier: args[4].value,
        },
        {
            sign: 1,
            valueOrVariableIdentifier: parseInt(args[8].value),
        },
    ]);
}

export function minusAssignment(args: any[]) {
    return new Assignment(getDefaultPosition(args), args[0].value, [
        {
            sign: 1,
            valueOrVariableIdentifier: args[4].value,
        },
        {
            sign: -1,
            valueOrVariableIdentifier: parseInt(args[8].value),
        },
    ]);
}

export function variableAssignment(args: any[]) {
    return new ShorthandStatement(
        new Assignment(getDefaultPosition(args), args[0].value, [
            {
                sign: 1,
                valueOrVariableIdentifier: args[4].value,
            },
        ]),
        'variableAssignment'
    );
}

export function doubleVariablePlusAssignment(args: any[]) {
    return new ShorthandStatement(
        new Assignment(getDefaultPosition(args), args[0].value, [
            {
                sign: 1,
                valueOrVariableIdentifier: args[4].value,
            },
            {
                sign: 1,
                valueOrVariableIdentifier: args[8].value,
            },
        ]),
        'doubleVariableAssignment'
    );
}

export function doubleVariableMinusAssignment(args: any[]) {
    return new ShorthandStatement(
        new Assignment(getDefaultPosition(args), args[0].value, [
            {
                sign: 1,
                valueOrVariableIdentifier: args[4].value,
            },
            {
                sign: -1,
                valueOrVariableIdentifier: args[8].value,
            },
        ]),
        'doubleVariableAssignment'
    );
}

export function constantAssignment(args: any[]) {
    return new ShorthandStatement(
        new Assignment(getDefaultPosition(args), args[0].value, [
            {
                sign: 1,
                valueOrVariableIdentifier: parseInt(args[4].value),
            },
        ]),
        'constantAssignment'
    );
}

export function finiteLoop(args: any[]) {
    return new FiniteLoop(getDefaultPosition(args), args[6], args[2].value);
}

export function whileLoop(args: any[]) {
    return new WhileLoop(
        getDefaultPosition(args),
        args[10],
        args[2].value,
        parseInt(args[6].value)
    );
}

export function branch(args: any[]) {
    return new ShorthandStatement(
        new Branch(
            getDefaultPosition(args),
            args[10],
            args[2].value,
            parseInt(args[6].value)
        ),
        'branch'
    );
}
