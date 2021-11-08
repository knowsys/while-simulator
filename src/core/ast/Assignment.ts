import { Configuration } from '../interpreter/Configuration';
import { Statement, StatementPosition } from './Statement';

export interface AssignmentOperand {
    readonly sign: 1 | -1;
    readonly valueOrVariableIdentifier: number | string;
}

/**
 * Handles all sorts of assignments with one or many operands
 */
export class Assignment extends Statement {
    /**
     * @param operands List of operands that get summed up. This way for example double assignments and constant assignments are supported.
     */
    public constructor(
        position: StatementPosition,
        public readonly destinationVariableIdentifier: string,
        public readonly operands: AssignmentOperand[]
    ) {
        super(
            position,
            new Set(
                operands
                    .map((operand) => operand.valueOrVariableIdentifier)
                    .filter(
                        (operand) => typeof operand === 'string'
                    ) as string[]
            )
        );
    }

    public *execute(
        initialConfiguration: Configuration
    ): Generator<Configuration, void> {
        let value = 0;
        for (const operand of this.operands) {
            const operandValue =
                typeof operand.valueOrVariableIdentifier === 'string'
                    ? initialConfiguration.getValue(
                          operand.valueOrVariableIdentifier
                      )
                    : operand.valueOrVariableIdentifier;
            value = Math.max(0, value + operand.sign * operandValue);
        }

        const newValue = Math.max(0, value);
        const variables = {
            ...initialConfiguration.variables,
            [this.destinationVariableIdentifier]: newValue,
        };

        yield new Configuration(this, variables);
    }

    public getChildren(): Statement[] {
        return [];
    }
}
