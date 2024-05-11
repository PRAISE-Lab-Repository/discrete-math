// main.js
import { generateGrids } from './gridGenerator.js';
import { generateStatement } from './statementGenerator.js';
import { displayGrid } from './grid.js';

let currentState = {
    grid: null,
    satisfies: null,
    statement: null,
    value: null
};

document.addEventListener('DOMContentLoaded', () => {
    initializeGame();
    document.getElementById('true-button').addEventListener('click', () => evaluateGuess(true));
    document.getElementById('false-button').addEventListener('click', () => evaluateGuess(false));
    document.getElementById('next-question').addEventListener('click', initializeGame);
});

function initializeGame() {
    console.log("initializeGame started");
    const statementData = generateStatement();
    const generated = generateGrids(statementData);

    console.log("Generated grid:", generated.grid);


    currentState.grid = generated.grid;
    currentState.satisfies = generated.satisfies;
    currentState.statement = statementData;
    currentState.value = generated.result;

    console.log("grid", currentState.grid)

    displayGrid(currentState.grid);
    document.getElementById('statement-text').textContent = statementData.text;
    console.log("initializeGame completed");
}



function evaluateGuess(userGuess) {
    console.log("user", userGuess)
    console.log("ans", currentState.satisfies)
    const isCorrect = (userGuess === currentState.satisfies);
    displayResult(isCorrect);

}

function displayResult(isCorrect) {
    const resultMessage = isCorrect ? 'Correct! Your answer is true.' : 'Incorrect! Your answer is false.';
    alert(resultMessage);
}

