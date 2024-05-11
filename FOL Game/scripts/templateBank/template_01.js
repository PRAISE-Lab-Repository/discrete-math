// template_01.js
import { randomIntFromInterval, getRandomElement, shapes, numbers, gridSize, colors } from '../utils.js';

export const template_01 = {
    text: "For every {shape1}, if it is {relation1} a {color2} {shape2}, this {shape1} is {color1}.",
    logic: (satisfies, details) => {
        // Initialize grid with default values
        let grid = Array.from({ length: gridSize * gridSize }, (_, index) => ({
            shape: 'square',
            color: 'black',
            number: 0,
            position: index
        }));


        let backpoints = [];

        // Randomly decide the number of pairs to set up the specified condition
        const numberOfPairs = randomIntFromInterval(1, 8);

        // Define offset based on position
        let offset = details.relation1.offset;

        for (let i = 0; i < numberOfPairs; i++) {
            let index;
            // Ensure the selected index is valid based on the grid and position
            do {
                index = randomIntFromInterval(0, gridSize * gridSize - 1);
            } while (!isValidPosition(index, offset));

            // Setup grid cells to satisfy the template condition
            const relatedIndex = index + offset;
            grid[relatedIndex] = {
                shape: details.shape1,
                color: details.color1,
                number: getRandomElement(numbers),
                position: relatedIndex
            };
            grid[index] = {
                shape: details.shape2,
                color: details.color2,
                number: getRandomElement(numbers),
                position: index
            };
            backpoints.push(index);
        }

        // Fill the rest of the grid with random shapes and colors that do not conflict with conditions
        grid.forEach((cell, idx) => {
            if (cell.color === 'black') {
                let shapesAvailable = shapes.filter(sh => sh !== details.shape1);
                let colorsAvailable = colors.filter(co => co !== details.color1);
                cell.shape = getRandomElement(shapesAvailable);
                cell.color = getRandomElement(colorsAvailable);
                cell.number = getRandomElement(numbers);
            }
        });

        // If condition should be violated, introduce the violations
        if (!satisfies) {
            backpoints.forEach(index => {
                // Adjust color of 'shape1' to not be 'color1' to introduce a violation
                const relatedIndex = index + offset;
                let alternativeColors = colors.filter(co => co !== details.color1);
                if (alternativeColors.length > 0) {
                    grid[relatedIndex].color = getRandomElement(alternativeColors);
                } else {
                    console.error("No alternative colors available to introduce violation at index", relatedIndex);
                }
            });
        }

        return {
            grid: grid,
            satisfies: satisfies
        };
    }
};

function isValidPosition(index, offset) {
    const row = Math.floor(index / gridSize);
    const col = index % gridSize;

    if (offset === 1 && col === gridSize - 1) return false; // No right neighbor
    if (offset === -1 && col === 0) return false; // No left neighbor
    if (offset === gridSize && row === gridSize - 1) return false; // No below neighbor
    if (offset === -gridSize && row === 0) return false; // No above neighbor

    return true;
}
