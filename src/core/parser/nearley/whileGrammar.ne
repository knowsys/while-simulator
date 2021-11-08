@{%
/* eslint-disable */
import * as g from "./generateAST";
import { createLexer } from "./tokens";

const lexer = createLexer();
%}

# Use custom lexer
@lexer lexer
@preprocessor typescript

program ->
    _ statementSequence %endOfFile
        {% g.passOnSecond %}

statementSequence ->
    (statement statementEnd):* statement statementEndOrWhitespace
        {% g.statementSequence %}

statement ->
    assignment
        {% g.passOnFirst %}
    | finiteLoop
        {% g.passOnFirst %}
    | whileLoop
        {% g.passOnFirst %}
    | branch
        {% g.passOnFirst %}

assignment ->
    %identifier _ %assign _ %identifier _ %plus _ integerLiteral
        {% g.plusAssignment %}
    | %identifier _ %assign _ %identifier _ %minus _ integerLiteral
        {% g.minusAssignment %}
    | %identifier _ %assign _ %identifier
        {% g.variableAssignment %}
    | %identifier _ %assign _ %identifier _ %plus _ %identifier
        {% g.doubleVariablePlusAssignment %}
    | %identifier _ %assign _ %identifier _ %minus _ %identifier
        {% g.doubleVariableMinusAssignment %}
    | %identifier _ %assign _ integerLiteral
        {% g.constantAssignment %}

finiteLoop ->
    %finiteLoopStart __ %identifier __ %loopDo __ statementSequence %loopEnd
        {% g.finiteLoop %}

whileLoop ->
    %whileLoopStart __ %identifier _ %notEqual _ %zeroIntegerLiteral __ %loopDo __ statementSequence %loopEnd
        {% g.whileLoop %}

branch ->
    %branchStart __ %identifier _ %notEqual _ %zeroIntegerLiteral __ %branchThen __ statementSequence %loopEnd
        {% g.branch %}

integerLiteral ->
    %zeroIntegerLiteral
        {% g.passOnFirst %}
    | %nonZeroIntegerLiteral
        {% g.passOnFirst %}

# Single semicolon or at least one new line
statementEnd ->
    (%whitespace | comment):* (%semicolon | %newLine) _
        {% g.empty %}
# Single semicolon or at least one new line or whitespace
statementEndOrWhitespace ->
    (_ %semicolon _ | __):?
        {% g.empty %}
# Required whitespace
__ ->
    (%newLine | %whitespace | comment):+
        {% g.empty %}
# Optional whitespace
_ ->
    (%newLine | %whitespace | comment):*
        {% g.empty %}

comment ->
    %singleLineComment
        {% g.empty %}
