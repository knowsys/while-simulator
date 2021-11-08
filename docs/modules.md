# Modules

The application is divided into the following modules:

-   `src/app`: The web application
    -   `/components`: ReactJS web components
    -   `/i18n`: Internationalization and translation files
    -   `/store`: Application redux data store
-   `src/core`: Core module for parsing and running WHILE programs
    -   `/ast`: Abstract syntax tree representing a parsed program
    -   `/interpreter`: Interpreter for executing a program
    -   `/parser`: Lexer and parser for generating a abstract syntax tree from plain text, see `docs/updatingTheGrammar.md`
