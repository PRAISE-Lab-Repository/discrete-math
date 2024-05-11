// template_08.js
import { getRandomElement, shapes, numbers, gridSize, colors } from '../utils.js';

export const template_08 = {
    text: "If a {shape1} is present, at least {number1} of them must be {color1}, and no more than {number2} of them numbered {number2}.",
    logic: (satisfies, details) => {
        // Initialize grid with black squares
        let grid = Array.from({ length: gridSize * gridSize }, (_, index) => ({
            shape: 'square', // Placeholder shape
            color: 'black',  // Initial color for all
            number: getRandomElement(numbers),
            position: index
        }));

        const targetShape = details.shape1;
        const targetColor1 = details.color1;
        const targetNumber2 = details.number2;
        const minShapesColor1 = details.number1;
        const maxShapesNumbered2 = details.number2;

        let targetShapeIndices = [];

        // Function to fill specific indices with the target shape
        const fillTargetShape = () => {
            let availableIndices = Array.from({ length: grid.length }, (_, index) => index);
            const count = Math.floor(grid.length / 4); // Fill up to 1/4 of the grid

            for (let i = 0; i < count; i++) {
                const index = getRandomElement(availableIndices);
                availableIndices = availableIndices.filter(idx => idx !== index);

                grid[index].shape = targetShape;
                targetShapeIndices.push(index);
            }

            // Ensure at least one instance of the target shape is present
            if (targetShapeIndices.length === 0) {
                const index = getRandomElement(availableIndices);
                grid[index].shape = targetShape;
                targetShapeIndices.push(index);
            }
        };

        // Function to ensure conditions are met
        const ensureConditions = () => {
            let indicesToColor1 = [];
            let indicesNumbered2 = [];

            // Determine values for N and M
            const N = minShapesColor1 + Math.floor(Math.random() * 4); // N >= minShapesColor1 + random(0, 3)
            const M = maxShapesNumbered2 - Math.floor(Math.random() * 2); // M <= maxShapesNumbered2 - random(0, 1)

            // Select indices for targetColor1
            indicesToColor1 = targetShapeIndices.sort(() => 0.5 - Math.random()).slice(0, N);
            indicesToColor1.forEach(index => {
                grid[index].color = targetColor1;
                grid[index].number = getRandomElement(numbers.filter(num => num !== targetNumber2));
            });

            // Select indices for targetNumber2
            indicesNumbered2 = targetShapeIndices.filter(index => !indicesToColor1.includes(index)).sort(() => 0.5 - Math.random()).slice(0, M);
            indicesNumbered2.forEach(index => grid[index].number = targetNumber2);

            // Fill remaining target shapes with other colors/numbers
            targetShapeIndices.forEach(index => {
                if (!indicesToColor1.includes(index) && !indicesNumbered2.includes(index)) {
                    grid[index].color = getRandomElement(colors.filter(color => color !== targetColor1));
                    grid[index].number = getRandomElement(numbers.filter(num => num !== targetNumber2));
                }
            });

            return { N, M, indicesToColor1, indicesNumbered2 };
        };

        // Fill the target shapes in the grid first
        fillTargetShape();

        // Ensure conditions are met initially
        const { N, M, indicesToColor1, indicesNumbered2 } = ensureConditions();

        // Fill unrelated entities
        grid.forEach(cell => {
            if (cell.shape === 'square' || cell.color === 'black') {
                let shape, color, number;
                do {
                    shape = getRandomElement(shapes);
                    color = getRandomElement(colors);
                    number = getRandomElement(numbers);
                } while (shape === targetShape || color === targetColor1 || number === targetNumber2);

                cell.shape = shape;
                cell.color = color;
                cell.number = number;
            }
        });

        // Introduce violations if `satisfies` is `false`
        if (!satisfies) {
            const introduceViolation = () => {
                // 1. Replace (N - minShapesColor1 + 1) valid grid cells with invalid colors
                const indicesToViolateColor1 = indicesToColor1.sort(() => 0.5 - Math.random()).slice(0, N - minShapesColor1 + 1);
                indicesToViolateColor1.forEach(index => grid[index].color = getRandomElement(colors.filter(color => color !== targetColor1)));

                // 2. Replace (maxShapesNumbered2 - M + 1) valid grid cells with targetNumber2
                const indicesToViolateNumber2 = indicesNumbered2.sort(() => 0.5 - Math.random()).slice(0, maxShapesNumbered2 - M + 1);
                indicesToViolateNumber2.forEach(index => grid[index].number = getRandomElement(numbers.filter(num => num !== targetNumber2)));

                // Ensure at least one instance of the target shape remains
                const remainingTargetShapeIndices = grid.filter(cell => cell.shape === targetShape).map(cell => cell.position);
                if (remainingTargetShapeIndices.length === 0) {
                    const randomIndex = getRandomElement(grid.map((_, index) => index));
                    grid[randomIndex].shape = targetShape;
                }
            };

            introduceViolation();
        }

        // Shuffle the grid
        grid = grid.sort(() => 0.5 - Math.random());

        return {
            grid: grid,
            satisfies: satisfies
        };
    }
};
