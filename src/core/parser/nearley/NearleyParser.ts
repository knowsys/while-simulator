import * as nearley from 'nearley';
import { Statement } from '../../ast/Statement';
import { Parser } from '../Parser';
import compiledGrammarRules from './generatedWhileGrammar';

const enfOfFile = '$EOF$ebe91ee6-f3df-11eb-88fe-3af9d3cec4f0';

export class NearleyParser extends Parser {
    private grammar = nearley.Grammar.fromCompiled(compiledGrammarRules);

    public parseProgramText(programText: string): Statement {
        const parser = new nearley.Parser(this.grammar);

        parser.feed(programText + enfOfFile);

        const possibleASTs = parser.finish();

        if (possibleASTs.length === 0) {
            throw new Error('No AST found.');
        }
        if (possibleASTs.length > 1) {
            console.error('[NearleyParser] Multiple ASTs found:', possibleASTs);
            throw new Error(
                'Multiple ASTs found. This is not allowed. Grammar is ambiguous.'
            );
        }

        console.info('[NearleyParser] Parsed AST:', possibleASTs[0]);

        return possibleASTs[0];
    }
}
