import { Configuration } from '../interpreter/Configuration';
import { Marker } from '../interpreter/Marker';

export type ExecutionGenerator = Generator<Configuration | Marker, void>;

/**
 * Locates a statement inside of the program text.
 *
 * Gets used for e. g. highlighting the currently executed statement.
 */
export interface StatementPosition {
    readonly startIndex: number;
    readonly endIndex: number;
}

export abstract class Statement {
    public parent?: Statement;

    constructor(
        public readonly position: StatementPosition,
        public readonly mentionedVariables: Set<string>
    ) {}

    /**
     * Gets the ancestors of this statement.
     *
     * @returns A list of ancestors ending with the statement itself. The list includes this statement, it's parent, the parent's parent, and so on, but in reversed order.
     */
    public getAncestors() {
        const parents: Statement[] = [this];

        let currentStatement: Statement = this;
        while (currentStatement.parent) {
            currentStatement = currentStatement.parent;
            parents.push(currentStatement);
        }

        parents.reverse();

        return parents;
    }

    public abstract execute(
        initialConfiguration: Configuration
    ): ExecutionGenerator;

    public abstract getChildren(): Statement[];
}
