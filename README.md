# while-simulator

Web application for developing and testing WHILE/LOOP programs.

Developed by [Simon Meusel](https://simonmeusel.de) and [contributors](https://github.com/knowsys/while-simulator/graphs/contributors)
at the research group [Knowledge-Based Systems](https://iccl.inf.tu-dresden.de/web/Wissensbasierte_Systeme/en).

## Grammar files and parser

-   The WHILE/LOOP language grammar can be found at `src/core/parser/nearley/whileGrammar.ne` and `src/core/parser/nearley/tokens.ts`
-   To programmatically parse, analyse and run a WHILE/LOOP program, use the `src/core` module:

```typescript
const parser = new NearleyParser();

const programText = 'LOOP x1 DO x0 := x0 + x2 END';
const program = new Program(parser.parseProgramText(programText));

const generator = program.start();

// Simulate the program step by step
for (const configuration of generator) {
    console.log(configuration);
}
```

## How to contribute

-   If you don't know where to start, read `docs/gettingStarted.md`.
-   The application structure is described in `docs/modules.md`
-   Read `docs/guidelines.md`
-   The application docs should be kept in sync with the source code
