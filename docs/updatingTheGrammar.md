## Adding or changing a lexer token

-   Add the token to the lexer
    -   Update `src/core/parser/nearley/tokens.ts`
    -   See https://www.npmjs.com/package/moo
-   Use the token in the grammar
-   Add token syntax highlighting
    -   Update `src/app/components/leftPanel/editor/draftJSEditor/WhileDecorator.tsx`
-   Add a usage example for parser error popovers
    -   Update `src/app/components/leftPanel/editor/draftJSEditor/parserError/ParserErrorPopover.tsx`
-   Add token translations for each language
    -   Update `editor.tokenTypes` in `src/app/i18n`

## Updating the grammar of the parser

-   Change the grammar rules
    -   Update `src/core/parser/nearley/whileGrammar.ne`
    -   Prevent [grammar ambiguity](https://nearley.js.org/docs/parser#a-note-on-ambiguity)
    -   Run `npm run generateParser` to regenerate the parser code
-   Add code for new statements
    -   Update `src/core/ast/`
-   Adjust generation of the syntax tree
    -   Update `src/core/parser/nearley/generateAST.ts`
