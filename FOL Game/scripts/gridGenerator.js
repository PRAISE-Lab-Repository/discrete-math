// gridGenerator.js
function generateGrids(statement) {
    let satisfies = Math.random() < 0.5;
    const grid = statement.template.logic(satisfies, statement.details).grid;
    console.log("grid", grid);

    satisfies = statement.template.logic(satisfies, statement.details).satisfies;

    return {
        grid: grid,
        satisfies: satisfies,
        statement: statement.text
    };
}

export { generateGrids };
