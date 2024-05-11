// template_04.js
import { getRandomElement, shapes, numbers, gridSize, colors, randomIntFromInterval } from '../utils.js';

export const template_04 = {
    text: "Numbers {order1} from {direction1} for {shape1}s.",
    logic: (satisfies, details) => {
        // Initialize the grid with all black squares
        let grid = Array.from({ length: gridSize * gridSize }, (_, index) => ({
            shape: 'square',
            color: 'black',
            number: 0,
        }));

        const shape1Count = randomIntFromInterval(2, gridSize);
        const rowOrColumnCount = randomIntFromInterval(1, gridSize);

        const fillRow = (row, ascending, shape, count) => {
            let indices = [];
            for (let col = 0; col < gridSize; col++) {
                indices.push(row * gridSize + col);
            }
            if (!ascending) indices.reverse();

            let number = ascending ? randomIntFromInterval(1, 5) : randomIntFromInterval(6, 10);
            for (let i = 0; i < count; i++) {
                const index = indices[i];
                grid[index] = {
                    shape: shape,
                    color: getRandomElement(colors),
                    number: number,
                };
                number += ascending ? randomIntFromInterval(1, 3) : -randomIntFromInterval(1, 3);
            }
        };

        const fillColumn = (col, ascending, shape, count) => {
            let indices = [];
            for (let row = 0; row < gridSize; row++) {
                indices.push(row * gridSize + col);
            }
            if (!ascending) indices.reverse();

            let number = ascending ? randomIntFromInterval(1, 5) : randomIntFromInterval(6, 10);
            for (let i = 0; i < count; i++) {
                const index = indices[i];
                grid[index] = {
                    shape: shape,
                    color: getRandomElement(colors),
                    number: number,
                };
                number += ascending ? randomIntFromInterval(1, 3) : -randomIntFromInterval(1, 3);
            }
        };

        // Handle different directions
        const applyRule = (order, direction, shape) => {
            const ascending = order === "increase";
            switch (direction) {
                case "left to right in every row":
                    for (let row = 0; row < rowOrColumnCount; row++) {
                        fillRow(row, ascending, shape, shape1Count);
                    }
                    break;
                case "right to left in every row":
                    for (let row = 0; row < rowOrColumnCount; row++) {
                        fillRow(row, !ascending, shape, shape1Count);
                    }
                    break;
                case "top to bottom in every column":
                    for (let col = 0; col < rowOrColumnCount; col++) {
                        fillColumn(col, ascending, shape, shape1Count);
                    }
                    break;
                case "bottom to top in every column":
                    for (let col = 0; col < rowOrColumnCount; col++) {
                        fillColumn(col, !ascending, shape, shape1Count);
                    }
                    break;
                default:
                    break;
            }
        };


        applyRule(details.order, details.direction1, details.shape1);

        // Fill the rest of the grid with random shapes, colors, and numbers not matching {shape1}
        grid.forEach(cell => {
            if (cell.color === 'black') {
                let shapesAvailable = shapes.filter(shape => shape !== details.shape1);
                cell.shape = getRandomElement(shapesAvailable);
                cell.color = getRandomElement(colors);
                cell.number = getRandomElement(numbers);
            }
        });

        // Introduce violations if the condition is not to be satisfied
        if (!satisfies) {
            const violationIndices = [];

            switch (details.direction1) {
                case "left to right in every row":
                case "right to left in every row":
                    for (let row = 0; row < rowOrColumnCount; row++) {
                        for (let col = 0; col < gridSize; col++) {
                            const index = row * gridSize + col;
                            if (grid[index].shape === details.shape1) violationIndices.push(index);
                        }
                    }
                    break;

                case "top to bottom in every column":
                case "bottom to top in every column":
                    for (let col = 0; col < rowOrColumnCount; col++) {
                        for (let row = 0; row < gridSize; row++) {
                            const index = row * gridSize + col;
                            if (grid[index].shape === details.shape1) violationIndices.push(index);
                        }
                    }
                    break;
            }

            // Randomly replace some shape1 cells with other shapes to add diversity
            const numReplacements = randomIntFromInterval(2, Math.min(5, violationIndices.length));
            for (let i = 0; i < numReplacements; i++) {
                const replaceIdx = violationIndices[Math.floor(Math.random() * violationIndices.length)];
                grid[replaceIdx] = {
                    shape: getRandomElement(shapes.filter(sh => sh !== details.shape1)),
                    color: getRandomElement(colors),
                    number: getRandomElement(numbers),
                };
            }
        }

        return {
            grid: grid,
            satisfies: satisfies
        };
    }
};

