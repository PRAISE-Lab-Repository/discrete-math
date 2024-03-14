//Functions to tokenize the input

// Tokenize
function tokenize(expression) {
    // Replace logical operators with placeholders if necessary
    expression = expression.toString().replace(/<->/g, '=').replace(/->/g, '>');


    const operators = ['\\^', 'v', 'V', '~', '=', '>', 'T', 'F'];
    const operatorsPattern = operators.join('|') + '|\\(|\\)';
    const regexPattern = `(${operatorsPattern})|[a-zA-Z]`;

    // Match valid tokens based on the regex pattern
    const tokens = expression.match(new RegExp(regexPattern, 'g'));

    if (!tokens) {
        throw new Error('Invalid expression or unable to tokenize.');
    }

    // Check for consecutive operators, considering 'v', 'V', and '~' as operators
    for (let i = 0; i < tokens.length - 1; i++) {
        if (['^', 'v', 'V', '=', '>'].includes(tokens[i]) && ['^', 'v', 'V', '=', '>'].includes(tokens[i + 1])) {

            if (!(tokens[i + 1] === '~')) {
                throw new Error('Consecutive operators detected without operands in between.');
            }
        }
    }

    // Replace placeholders with original logical operators
    return tokens.map(token => {
        return token;
    });
}

// Check if the sequence of tokens is valid
function isValidTokenSequence(tokens) {
    // Check for adjacent operands without an operator between them
    for (let i = 0; i < tokens.length - 1; i++) {
        const currentIsOperand = /^[a-eg-sw-zA-EG-SW-ZuU]$/.test(tokens[i]) || ['T', 'F'].includes(tokens[i]);
        const nextIsOperand = /^[a-eg-sw-zA-EG-SW-ZuU]$/.test(tokens[i + 1]) || ['T', 'F'].includes(tokens[i + 1]);

        if (currentIsOperand && nextIsOperand) {
            // Found two adjacent operands, which is invalid
            return false;
        }
    }

    return true;
}
