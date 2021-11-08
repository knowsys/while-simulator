import { Statement } from '../ast/Statement';

export abstract class Parser {
    public abstract parseProgramText(program: string): Statement;
}
