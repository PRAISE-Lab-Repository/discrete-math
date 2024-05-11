// template_07.js
import { getRandomElement, shapes, numbers, gridSize, colors } from '../utils.js';

export const template_07 = {
    text: "All {shape1}s are {color1}, except those numbered {number1}.",
    logic: (satisfies, details) => {
        // Initialize the grid with placeholders
        let grid = Array.from({ length: gridSize * gridSize }, (_, index) => ({
            shape: getRandomElement(shapes),
            color: getRandomElement(colors),
            number: getRandomElement(numbers),
            position: index
        }));

        const targetShape = details.shape1;
        const targetColor = details.color1;
        const targetNumber = details.number1;

        // Get all indices where the shape is the target shape
        let shapeIndices = grid
            .map((entity, index) => entity.shape === targetShape ? index : null)
            .filter(index => index !== null);

        // Function to set the target color for all `shape1` except those numbered `targetNumber`
        const setTargetColor = (grid, targetColor, targetNumber, indices) => {
            let found = false;
            const differentColors = colors.filter(c => c !== targetColor);

            indices.forEach(index => {
                if (grid[index].number === targetNumber) {
                    grid[index].color = getRandomElement(differentColors);
                    found = true;
                } else {
                    grid[index].color = targetColor;
                }
            });

            return found;
        };

        if (satisfies) {
            // Ensure all `shape1`s are `color1` except those numbered `number1`
            if (!setTargetColor(grid, targetColor, targetNumber, shapeIndices)) {
                // If no entity was found with `targetNumber`, ensure one instance has a different color
                const lastIndex = shapeIndices[shapeIndices.length - 1];
                const differentColors = colors.filter(c => c !== targetColor);
                grid[lastIndex].color = getRandomElement(differentColors);
            }
        } else {
            // Violate the condition by setting additional `shape1` to a different color
            let nonTargetIndices = [];
            let targetIndices = [];

            shapeIndices.forEach(index => {
                if (grid[index].number === targetNumber) {
                    nonTargetIndices.push(index);
                } else {
                    targetIndices.push(index);
                }
            });

            const differentColors = colors.filter(c => c !== targetColor);

            // Ensure at least two indices do not match `color1`
            if (nonTargetIndices.length > 0) {
                grid[nonTargetIndices[0]].color = getRandomElement(differentColors);
            }

            if (targetIndices.length > 0) {
                grid[targetIndices[0]].color = getRandomElement(differentColors);
            }

            targetIndices.slice(1).forEach(index => {
                grid[index].color = targetColor;
            });
        }

        return {
            grid: grid,
            satisfies: satisfies
        };
    }
};
