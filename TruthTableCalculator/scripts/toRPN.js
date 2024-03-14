// Function to convert tokens to RPN
function toRPN(tokens) {
    const operators = {
        '~': { precedence: 5, associativity: 'right', arity: 'unary' },
        '^': { precedence: 4, associativity: 'left', arity: 'binary' },
        'v': { precedence: 3, associativity: 'left', arity: 'binary' },
        'V': { precedence: 3, associativity: 'left', arity: 'binary' },
        '>': { precedence: 2, associativity: 'left', arity: 'binary' },
        '=': { precedence: 1, associativity: 'left', arity: 'binary' },
    };

    let outputQueue = [];
    let operatorStack = [];

    tokens.forEach((token, index) => {
        if (token.match(/^[a-eg-sw-zA-EG-SW-Z]$/) || ['T', 'F'].includes(token)) {
            outputQueue.push(token);
        } else if (token === '(') {
            operatorStack.push(token);
        } else if (token === ')') {
            while (operatorStack.length > 0 && operatorStack[operatorStack.length - 1] !== '(') {
                outputQueue.push(operatorStack.pop());
            }
            if (operatorStack.length > 0) {
                operatorStack.pop(); // Remove the opening parenthesis
            } else {
                throw new Error("Mismatched parentheses detected.");
            }
        } else if (token in operators) {
            // Allow '~' to be placed before an operand or an opening parenthesis
            if (token === '~') {
                if (index === tokens.length - 1 || operators[tokens[index + 1]] && tokens[index + 1] !== '(') {
                    throw new Error("Invalid placement of '~' operator. It must precede an operand or an opening parenthesis.");
                }
            }
            while (operatorStack.length > 0) {
                const o2 = operatorStack[operatorStack.length - 1];
                if (o2 === '(') break; // Do not pop '(' for comparison

                const o1Precedence = operators[token].precedence;
                const o2Precedence = operators[o2].precedence;

                // Check associativity and precedence, also considering the arity of the operators
                if ((operators[o2].arity === 'binary' && (o2Precedence > o1Precedence || (o2Precedence === o1Precedence && operators[token].associativity === 'left')))
                    || (operators[o2].arity === 'unary' && o2Precedence >= o1Precedence)) {
                    outputQueue.push(operatorStack.pop());
                } else {
                    break;
                }
            }
            operatorStack.push(token);
        }
    });

    while (operatorStack.length > 0) {
        if (operatorStack[operatorStack.length - 1] === '(') {
            throw new Error("Mismatched parentheses detected.");
        }
        outputQueue.push(operatorStack.pop());
    }
    return outputQueue;
}
