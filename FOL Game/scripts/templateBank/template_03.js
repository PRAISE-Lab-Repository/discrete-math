// template_03.js
import { randomIntFromInterval, getRandomElement, shapes, gridSize, colors } from '../utils.js';

export const template_03 = {
    text: "Exactly {number1} {shape1}(s) are {color1}.",
    logic: (satisfies, details) => {
        // Initialize the grid with random shapes and default color 'black'
        let grid = Array.from({ length: gridSize * gridSize }, (_, index) => ({
            shape: 'square',
            color: 'black',
            number: randomIntFromInterval(1, 10),
            position: index
        }));

        let matchingShapeIndices = [];  // This will store indices where {shape1} is {color1}

        // Populate the grid to meet the exact requirement of {number1} {shape1}s being {color1}
        while (matchingShapeIndices.length < details.number1) {
            let index = randomIntFromInterval(0, gridSize * gridSize - 1);
            if (!matchingShapeIndices.includes(index)) {  // Check for uniqueness
                grid[index].shape = details.shape1;
                grid[index].color = details.color1;

                matchingShapeIndices.push(index);  // Add to tracking list
            }
        }

        // Fill the rest of the grid ensuring no additional matches of {shape1} and {color1} are created
        grid.forEach((cell, idx) => {
            if (!matchingShapeIndices.includes(idx)) {  // Only modify non-targeted cells
                cell.shape = getRandomElement(shapes.filter(sh => sh !== details.shape1));
                cell.color = getRandomElement(colors.filter(co => co !== details.color1));

            }
        });

        // Introduce violations if not satisfied by modifying some of the specified shapes
        if (!satisfies) {
            const numViolations = Math.min(matchingShapeIndices.length, randomIntFromInterval(1, matchingShapeIndices.length));
            for (let i = 0; i < numViolations; i++) {
                const targetIndex = matchingShapeIndices[i];
                grid[targetIndex].color = getRandomElement(colors.filter(co => co !== details.color1));  // Ensure the color is changed to anything but {color1}
            }
        }

        return {
            grid: grid,
            satisfies: satisfies
        };
    }
};
