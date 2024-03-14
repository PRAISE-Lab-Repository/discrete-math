// Functions to evaluate RPN

// Evaluate RPN
function evaluateRPN(tokens) {
    let stack = [];

    tokens.forEach(token => {
        console.log(`tokens:`, tokens); // Debugging
        if (['T', 'F'].includes(token)) {
            stack.push(token === 'T');
        } else if (['^', 'v', 'V', '~', '>', '='].includes(token)) {
            let result;

            if (token === '~') {
                if (stack.length < 1) {
                    throw new Error("Invalid Input: Not enough operands for unary operator.");
                }
                let operand = stack.pop();
                result = !operand;
            } else {
                if (stack.length < 2) {
                    throw new Error("Invalid Input: Not enough operands for binary operator.");
                }
                let right = stack.pop();
                let left = stack.pop();
                console.log(`left:`, left); // Debugging
                console.log(`right:`, right); // Debugging

                switch (token) {
                    case '^':
                        result = left && right;
                        break;
                    case 'v':
                    case 'V': // Treat 'V' the same as 'v' for OR
                        result = left || right;
                        break;
                    case '>': // Implication
                        result = !left || right;
                        break;
                    case '=': // Biconditional
                        result = left === right;
                        break;
                    default:
                        throw new Error(`Unknown operator: ${token}`);
                }
            }

            console.log('Operation result:', result); // Debugging
            stack.push(result);
        } else {
            throw new Error(`Unknown token: ${token}`);
        }

        console.log('Stack:', stack); // Debugging
    });



    return stack.pop() ? 'T' : 'F';
}

// Check if the RPN tree is valid
function isValidRPN(tokens) {
    let stackDepth = 0;

    for (let token of tokens) {
        if (token.match(/[a-zA-ZTF]/)) {

            stackDepth++;
        } else if (['^', 'v'].includes(token)) {

            if (stackDepth < 2) {
                return false; // Not enough operands.
            }

            stackDepth--;
        } else if (token === '~') {

            if (stackDepth < 1) {
                return false; // Not enough operands.
            }

        } else {
            // Unknown token.
            return false;
        }
    }


    return stackDepth === 1;
}