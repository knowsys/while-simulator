import { Configuration } from '../interpreter/Configuration';
import { Statement, StatementPosition } from './Statement';

export class StatementSequence extends Statement {
    public constructor(public readonly innerStatements: Statement[]) {
        super(StatementSequence.getPosition(innerStatements), new Set());
        for (const statement of innerStatements) {
            statement.parent = this;
        }
    }

    private static getPosition(
        innerStatements: Statement[]
    ): StatementPosition {
        if (innerStatements.length === 0) {
            return { startIndex: 0, endIndex: 0 };
        }
        return {
            startIndex: innerStatements[0].position.startIndex,
            endIndex:
                innerStatements[innerStatements.length - 1].position.endIndex,
        };
    }

    public *execute(initialConfiguration: Configuration) {
        let configuration = initialConfiguration;
        for (const statement of this.innerStatements) {
            const generator = statement.execute(configuration);
            // Propagate all generated configurations
            for (const newConfiguration of generator) {
                yield newConfiguration;
                if (newConfiguration instanceof Configuration) {
                    configuration = newConfiguration;
                }
            }
        }
    }

    public getChildren(): Statement[] {
        return this.innerStatements;
    }
}
