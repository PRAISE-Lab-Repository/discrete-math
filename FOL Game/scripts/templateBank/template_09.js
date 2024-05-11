// template_09.js
import { randomIntFromInterval, getRandomElement, shapes, numbers, gridSize, colors } from '../utils.js';

export const template_09 = {
    text: "Exist such a {color1} {shape1} that the number of this grid is the same as its index (begin with 1).",
    logic: (satisfies, details) => {
        // Initialize grid with random shapes and colors
        let grid = Array.from({ length: gridSize * gridSize }, (_, index) => ({
            shape: getRandomElement(shapes),
            color: getRandomElement(colors),
            number: getRandomElement(numbers),
            position: index + 1 // Grid index starting from 1
        }));

        // Find indices that can hold the shape1 with color1
        const potentialIndices = grid.map((cell, index) => index + 1)
            .filter(num => num <= 9 && numbers.includes(num));

        // Ensure a grid cell meets the specified condition if `satisfies` is `true`
        if (satisfies && potentialIndices.length > 0) {
            const targetIndex = getRandomElement(potentialIndices) - 1;
            grid[targetIndex].shape = details.shape1;
            grid[targetIndex].color = details.color1;
            grid[targetIndex].number = targetIndex + 1;
        }

        // Introduce violations if `satisfies` is `false`
        if (!satisfies) {
            // Ensure there are no grid cells with the specified condition
            grid.forEach(cell => {
                if (cell.shape === details.shape1 && cell.color === details.color1 && cell.number === cell.position) {
                    cell.shape = getRandomElement(shapes.filter(shape => shape !== details.shape1));
                    cell.color = getRandomElement(colors.filter(color => color !== details.color1));
                }
            });
        }

        return {
            grid: grid,
            satisfies: satisfies
        };
    }
};
