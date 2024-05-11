// template_05.js
import { getRandomElement, shapes, numbers, colors, gridSize } from '../utils.js';

export const template_05 = {

    text: "The {position1} corner is a {color1} {shape1}.",
    logic: (satisfies, details) => {
        // Initialize the grid with default placeholders for all cells
        let grid = Array.from({ length: gridSize * gridSize }, () => ({
            shape: 'square',
            color: 'black',
            number: 0,
        }));

        // Determine the index for the specified corner

        let index;
        switch (details.position1) {
            case 'top left corner':
                index = 0;
                break;
            case 'top right corner':
                index = gridSize - 1;
                break;
            case 'bottom left corner':
                index = (gridSize) * (gridSize - 1);
                break;
            case 'bottom right corner':
                index = gridSize * gridSize - 1;
                break;
        }

        console.log("index:", index)



        // If the condition should be satisfied, set the specified corner to the details provided
        grid[index].color = details.color1;
        grid[index].shape = details.shape1;
        if (!satisfies) {
            // If the condition should not be satisfied, set the specified corner to different color and shape
            const differentColors = colors.filter(c => c !== details.color1);
            grid[index].color = getRandomElement(differentColors);
            const differentShapes = shapes.filter(s => s !== details.shape1);
            grid[index].shape = getRandomElement(differentShapes);
        }

        // Fill the rest of the grid with random shapes, colors, and numbers
        grid.forEach((cell, idx) => {
            if (idx !== index) { // Skip the specified corner already set
                cell.shape = getRandomElement(shapes);
                cell.color = getRandomElement(colors);
                cell.number = getRandomElement(numbers);
            }
        });

        return {
            grid: grid,
            satisfies: satisfies,

        };
    }
};
