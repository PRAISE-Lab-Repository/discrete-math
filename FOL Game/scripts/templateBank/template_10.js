// template_10.js
import { getRandomElement, shapes, numbers, gridSize, colors } from '../utils.js';

export const template_10 = {
    text: "There is no such entity that is either {color1}, or is a {shape1}, or has {number1}.",
    logic: (satisfies, details) => {
        // Initialize grid with black squares
        let grid = Array.from({ length: gridSize * gridSize }, (_, index) => ({
            shape: 'square', // Placeholder shape
            color: 'black',  // Initial color for all
            number: getRandomElement(numbers),
            position: index
        }));

        // Function to fill the grid while excluding the specified attributes
        const fillGridWithoutExcludedAttributes = (excludedColor, excludedShape, excludedNumber) => {
            grid.forEach(cell => {
                let shape, color, number;
                do {
                    shape = getRandomElement(shapes);
                    color = getRandomElement(colors);
                    number = getRandomElement(numbers);
                } while (shape === excludedShape || color === excludedColor || number === excludedNumber);

                cell.shape = shape;
                cell.color = color;
                cell.number = number;
            });
        };

        // Populate the grid based on whether it should satisfy or violate the condition
        if (satisfies) {
            // Exclude entities with the specified attributes
            fillGridWithoutExcludedAttributes(details.color1, details.shape1, details.number1);
        } else {
            // Fill grid without excluded attributes initially
            fillGridWithoutExcludedAttributes(details.color1, details.shape1, details.number1);

            // Function to introduce violations
            const introduceViolation = (index, violateShape, violateColor, violateNumber) => {
                if (violateShape) {
                    grid[index].shape = details.shape1;
                }
                if (violateColor) {
                    grid[index].color = details.color1;
                }
                if (violateNumber) {
                    grid[index].number = details.number1;
                }
            };

            // Randomly choose violation type(s) for a subset of entities
            const numViolations = Math.floor(gridSize / 2);
            const violationIndices = Array.from({ length: grid.length }, (_, index) => index);
            const selectedIndices = [];

            for (let i = 0; i < numViolations; i++) {
                const index = getRandomElement(violationIndices);
                violationIndices.splice(violationIndices.indexOf(index), 1);
                selectedIndices.push(index);

                // Randomly choose what attributes to violate (shape, color, number)
                const violateShape = Math.random() < 0.5;
                const violateColor = Math.random() < 0.5;
                const violateNumber = Math.random() < 0.5;

                // Ensure at least one attribute is violated
                introduceViolation(index, violateShape || !violateColor && !violateNumber, violateColor || !violateShape && !violateNumber, violateNumber || !violateShape && !violateColor);
            }
        }

        return {
            grid: grid,
            satisfies: satisfies
        };
    }
};
