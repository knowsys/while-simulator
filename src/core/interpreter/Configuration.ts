import { Statement } from '../ast/Statement';

export interface Variables {
    readonly [identifier: string]: number;
}

export class Configuration {
    constructor(
        public readonly lastStatement: Statement | null,
        public readonly variables: Variables = {}
    ) {}

    public getValue(identifier: string) {
        return this.variables[identifier] || 0;
    }

    public withRestrictedVariables(identifiers: Set<string>) {
        const newVariables: Variables = Object.fromEntries(
            [...identifiers].map((identifier) => [
                identifier,
                this.getValue(identifier),
            ])
        );
        return new Configuration(this.lastStatement, newVariables);
    }
}
