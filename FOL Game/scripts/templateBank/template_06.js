// template_06.js
import { getRandomElement, shapes, numbers, gridSize, colors } from '../utils.js';

export const template_06 = {
    text: "For all {color1} {shape1}s, if there is a {color2} {shape2} {relation1} this {color1} {shape1}, then there must be a {color3} {shape3} {relation2} this {color1} {shape1}.",
    logic: (satisfies, details) => {
        let grid = Array.from({ length: gridSize * gridSize }, () => ({
            shape: 'square',
            color: 'black',
            number: getRandomElement(numbers)
        }));

        const prohibitedCombinations = [
            { shape: details.shape1, color: details.color1 },
            { shape: details.shape2, color: details.color2 },
            { shape: details.shape3, color: details.color3 }
        ];

        const isProhibitedCombination = (shape, color) => {
            return prohibitedCombinations.some(combination => combination.shape === shape && combination.color === color);
        };

        // Calculate edge indices based on gridSize
        const edgeIndices = new Set();
        // Add first and last row indices
        for (let i = 0; i < gridSize; i++) {
            edgeIndices.add(i); // First row
            edgeIndices.add(gridSize * gridSize - 1 - i); // Last row
        }
        // Add first and last column indices
        for (let i = 0; i < gridSize; i++) {
            edgeIndices.add(i * gridSize); // First column of each row
            edgeIndices.add(i * gridSize + gridSize - 1); // Last column of each row
        }

        let backpoints = [];
        let attempts = 0;
        const maxAttempts = 100;

        while (backpoints.length < Math.floor(Math.random() * 5) + 1 && attempts < maxAttempts) {
            attempts++;
            let index = Math.floor(Math.random() * gridSize * gridSize);

            // Skip indices that are on the edge
            if (edgeIndices.has(index)) {
                continue;
            }

            let relation1Index = index + details.relation1.offset;
            let relation2Index = index + details.relation2.offset;

            // Verify index boundaries before assigning
            if (isValidIndex(index) && isValidIndex(relation1Index) && isValidIndex(relation2Index) &&
                !isProhibitedCombination(grid[relation1Index].shape, grid[relation1Index].color) &&
                !isProhibitedCombination(grid[relation2Index].shape, grid[relation2Index].color)) {
                grid[index].color = details.color1;
                grid[index].shape = details.shape1;
                grid[relation1Index].color = details.color2;
                grid[relation1Index].shape = details.shape2;
                grid[relation2Index].color = details.color3;
                grid[relation2Index].shape = details.shape3;
                backpoints.push({ index, relation1Index, relation2Index });
            }
        }

        grid.forEach((cell, index) => {
            if (cell.color === 'black') {
                do {
                    cell.shape = getRandomElement(shapes);
                    cell.color = getRandomElement(colors);
                } while (isProhibitedCombination(cell.shape, cell.color));
                cell.number = getRandomElement(numbers);
            }
        });

        // Introduce a violation if satisfies is set to false
        if (!satisfies && backpoints.length > 0) {
            const randomPoint = getRandomElement(backpoints);
            // Change color to ensure violation occurs
            grid[randomPoint.relation2Index].color = getRandomElement(colors.filter(c => c !== details.color3));
        }

        return {
            grid: grid,
            satisfies: satisfies
        };
    }
};

function isValidIndex(index) {
    return index >= 0 && index < gridSize * gridSize;
}
