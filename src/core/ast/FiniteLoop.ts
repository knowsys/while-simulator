import { Configuration } from '../interpreter/Configuration';
import { Loop } from './Loop';
import { Statement, StatementPosition } from './Statement';

export class FiniteLoop extends Loop {
    public constructor(
        position: StatementPosition,
        readonly innerStatement: Statement,
        public readonly loopVariableIdentifier: string
    ) {
        super(position, new Set([loopVariableIdentifier]), innerStatement);
        innerStatement.parent = this;
    }

    public *execute(initialConfiguration: Configuration) {
        yield 'finiteLoopStart';

        const iterations = initialConfiguration.getValue(
            this.loopVariableIdentifier
        );

        let configuration = initialConfiguration;
        for (let i = 0; i < iterations; i++) {
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

        yield 'finiteLoopEnd';
    }
}
