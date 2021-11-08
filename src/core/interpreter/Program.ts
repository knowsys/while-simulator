import { Statement } from '../ast/Statement';
import { Configuration } from './Configuration';

export class Program {
    public readonly mentionedVariableIdentifiers: Set<string>;

    constructor(public readonly rootStatement: Statement) {
        this.mentionedVariableIdentifiers = new Set();
        this.addMentionedVariableIdentifiers(rootStatement);
    }

    /**
     * Recursively finds all mentioned variable identifiers
     */
    public addMentionedVariableIdentifiers(statement: Statement) {
        for (const identifier of statement.mentionedVariables) {
            this.mentionedVariableIdentifiers.add(identifier);
        }
        for (const child of statement.getChildren()) {
            this.addMentionedVariableIdentifiers(child);
        }
    }

    public *start(initialConfiguration = new Configuration(null)) {
        initialConfiguration = initialConfiguration.withRestrictedVariables(
            this.mentionedVariableIdentifiers
        );
        yield initialConfiguration;
        yield* this.rootStatement.execute(initialConfiguration);
    }
}
