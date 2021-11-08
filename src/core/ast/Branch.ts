import { Configuration } from '../interpreter/Configuration';
import { Statement, StatementPosition } from './Statement';

export class Branch extends Statement {
    public constructor(
        position: StatementPosition,
        public readonly innerStatement: Statement,
        public readonly branchVariableIdentifier: string,
        public readonly skipBranchValue: number
    ) {
        super(position, new Set([branchVariableIdentifier]));
        innerStatement.parent = this;
    }

    public *execute(initialConfiguration: Configuration) {
        yield 'branchStart';

        if (
            initialConfiguration.getValue(this.branchVariableIdentifier) !==
            this.skipBranchValue
        ) {
            const generator = this.innerStatement.execute(initialConfiguration);
            // Propagate to inner statement
            for (const newConfiguration of generator) {
                yield newConfiguration;
            }
        }
    }

    public getChildren(): Statement[] {
        return [this.innerStatement];
    }
}
