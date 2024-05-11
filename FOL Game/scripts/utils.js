// utils.js
export const gridSize = 5;

export const positions = ['top left corner', 'top right corner', 'bottom left corner', 'bottom right corner']

export const shapes = ['circle', 'square', 'triangle'];

export const comparisons = ['more', 'less'];

export const equality = ['same', 'different'];

export const mathRelations = ['greater than', 'less than', 'equal to', 'greater than or equal to', 'less than or equal to'];

export const colors = ['#add8e6', '#77dd77', '#ff6961']; // Blue, Green, Red

export const colorNames = {
    '#add8e6': 'blue',
    '#77dd77': 'green',
    '#ff6961': 'red'
};

export const orders = ['increase', 'decrease'];

export const directions = ["left to right in every row", "right to left in every row", "top to bottom in every column", "bottom to top in every column"];

export const numbers = [2, 3, 4, 5, 6, 7, 8, 9];

export const range = [1, 2, 3];

export const relations = [
    { key: 'above', offset: -gridSize },
    { key: 'below', offset: gridSize },
    { key: 'to the left of', offset: -1 },
    { key: 'to the right of', offset: 1 }
];

export function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}


export function evaluateUserGuess(guess, satisfies) {
    return (guess === 'true' && satisfies) || (guess === 'false' && !satisfies);
}


export function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Setup common event listeners for game interactions.
export function setupEventListeners(startGame, submitAnswer, nextQuestion) {
    document.getElementById('start-game').addEventListener('click', startGame);
    document.getElementById('next-question').addEventListener('click', nextQuestion);
}

