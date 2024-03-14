# Truth Table Calculator

This Truth Table Calculator is a tool designed to compute the truth tables for given logical expressions. It uses a variety of symbols to represent logical operations.

## Symbols

The following symbols are used within the calculator to represent logical operations:

- `~` : Negation (NOT)
- `^` : Conjunction (AND)
- `v` : Disjunction (OR)
- `>` : Implication
- `=` : Biconditional (XNOR)
- `(` and `)` : Used to group expressions and override operator precedence

Please note that `~` can be used before any variable or a grouped expression to denote negation.

## Input Format

- Variables are represented by lowercase and uppercase letters from `a` to `z`, except for `v` which is used for disjunction. 
- The constants for True and False are represented as `T` and `F`, respectively.
- Expressions should be spaced properly to distinguish between different tokens.

## Output

The calculator outputs a truth table with columns for each variable and the resulting value of the logical expression for each possible combination of variable values.

## Usage

To use the calculator, input your logical expression into the provided interface. Ensure that you use the correct symbols as specified and that your expression is well-formed with the appropriate use of parentheses.

## Examples

Here are a few examples of logical expressions and their notation in the calculator:

- NOT A: `~A`
- A AND B: `A ^ B`
- A OR B: `A v B`
- A IMPLIES B: `A > B`
- A IF AND ONLY IF B: `A = B`
- NOT (A AND B) OR C: `~(A ^ B) v C`

## Error Handling

If the input is not well-formed, such as having consecutive operators without operands or misused parentheses, the calculator will return an error message prompting the user to correct the input.
