// Functions to generate truth table

// Generate an array of truth table
function generateTruthTableArray(expression) {
    let variablesSet = new Set();


    expression.forEach(token => {
        if (token.match(/^[a-eg-sw-zA-EG-SW-ZuU]$/)) {
            variablesSet.add(token);
        }
    });

    let variables = Array.from(variablesSet).sort();
    let truthTableArray = [];

    let headerRow = [...variables, expression.join(' ').replace(/~/g, '¬').replace(/>/g, '→').replace(/=/g, '↔').replace(/\^/g, '∧')];
    truthTableArray.push(headerRow);


    const tokens = tokenize(expression);
    const rpnTokens = toRPN(tokens);

    // Generate all combinations of truth values
    const numRows = Math.pow(2, variables.length);
    for (let i = 0; i < numRows; i++) {
        let row = [];
        let truthAssignment = {};

        // Generate the current combination of truth values
        for (let j = 0; j < variables.length; j++) {

            const value = ((i >> (variables.length - j - 1)) & 1) === 1 ? 'T' : 'F';
            row.push(value);
            truthAssignment[variables[j]] = value;
        }


        const evaluatedTokens = replaceVariables(rpnTokens, truthAssignment);

        const result = evaluateRPN(evaluatedTokens);
        console.log(`result:`, result); // Debugging

        row.push(result);

        truthTableArray.push(row);
    }

    return sortTruthTable(truthTableArray);
}



// Helper function to replace variables with their truth values in the expression
function replaceVariables(tokens, truthAssignment) {
    return tokens.map(token => {

        if (token in truthAssignment) {
            return truthAssignment[token];
        } else {

            return token;
        }
    });
}

// Helper function to sort the table
function sortTruthTable(truthTableArray) {

    const headerRow = truthTableArray[0];


    const dataRows = truthTableArray.slice(1);


    dataRows.sort((a, b) => {
        // Convert 'T' and 'F' to numbers (1 and 0) for each row, except the last column
        const rowA = a.slice(0, -1).map(value => value === 'T' ? 1 : 0).join('');
        const rowB = b.slice(0, -1).map(value => value === 'T' ? 1 : 0).join('');


        return rowB.localeCompare(rowA);
    });


    const sortedTruthTableArray = [headerRow, ...dataRows];
    return sortedTruthTableArray;
}

