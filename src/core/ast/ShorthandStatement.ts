import { Configuration } from '../interpreter/Configuration';
import { ExecutionGenerator, Statement } from './Statement';

export type ShorthandSyntaxType =
    | 'branch'
    | 'variableAssignment'
    | 'doubleVariableAssignment'
    | 'constantAssignment';

/**
 * Represents a statement written with simplified syntax
 */
export class ShorthandStatement extends Statement {
    public constructor(
        public readonly innerStatement: Statement,
        public readonly type: ShorthandSyntaxType
    ) {
        super(innerStatement.position, new Set());
        innerStatement.parent = this;
    }

    public execute(initialConfiguration: Configuration): ExecutionGenerator {
        return this.innerStatement.execute(initialConfiguration);
    }

    public getChildren(): Statement[] {
        return [this.innerStatement];
    }
}
