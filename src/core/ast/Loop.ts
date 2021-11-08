import { Statement, StatementPosition } from './Statement';

export abstract class Loop extends Statement {
    public constructor(
        position: StatementPosition,
        mentionedVariables: Set<string>,
        public readonly innerStatement: Statement
    ) {
        super(position, mentionedVariables);
    }

    public getChildren(): Statement[] {
        return [this.innerStatement];
    }
}
