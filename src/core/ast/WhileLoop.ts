import { Configuration } from '../interpreter/Configuration';
import { Loop } from './Loop';
import { Statement, StatementPosition } from './Statement';

export class WhileLoop extends Loop {
    public constructor(
        position: StatementPosition,
        innerStatement: Statement,
        public readonly loopVariableIdentifier: string,
        public readonly breakValue: number
    ) {
        super(position, new Set([loopVariableIdentifier]), innerStatement);
        innerStatement.parent = this;
    }

    public *execute(initialConfiguration: Configuration) {
        yield 'whileLoopStart';

        let configuration = initialConfiguration;
        while (
            configuration.getValue(this.loopVariableIdentifier) !==
            this.breakValue
        ) {
            // Execute inner loop statement
            const generator = this.innerStatement.execute(configuration);
            // Propagate all generated configurations
            for (const newConfiguration of generator) {
                yield newConfiguration;
                if (newConfiguration instanceof Configuration) {
                    configuration = newConfiguration;
                }
            }
        }

        yield 'whileLoopEnd';
    }
}
