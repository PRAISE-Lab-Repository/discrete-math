// template_02.js
import { randomIntFromInterval, getRandomElement, shapes, gridSize, colors } from '../utils.js';

export const template_02 = {
    text: "There are {comparison1} {color1} {shape1}s numbered {mathRelation1} {number1} than {color2} {shape2}s numbered {mathRelation2} {number2}.",
    logic: (satisfies, details) => {
        let grid = [];
        let countShape1 = 0, countShape2 = 0;

        const getNumberForShape = (mathRelation, number) => {
            switch (mathRelation) {
                case 'greater than':
                    return randomIntFromInterval(number + 1, 10);
                case 'less than':
                    return randomIntFromInterval(1, number - 1);
                case 'equal to':
                    return number;
                case 'greater than or equal to':
                    return randomIntFromInterval(number, 10);
                case 'less than or equal to':
                    return randomIntFromInterval(1, number);
                default:
                    return randomIntFromInterval(1, 10);
            }
        };

        const violatesNumbers = (mathRelation, number) => {
            switch (mathRelation) {
                case 'greater than':
                    return Array.from({ length: number }, (_, i) => i + 1);
                case 'less than':
                    return Array.from({ length: 10 - number }, (_, i) => i + number + 1);
                case 'equal to':
                    return Array.from({ length: 10 }, (_, i) => i + 1).filter(nu => nu !== number);
                case 'greater than or equal to':
                    return Array.from({ length: number - 1 }, (_, i) => i + 1);
                case 'less than or equal to':
                    return Array.from({ length: 10 - number }, (_, i) => i + number + 1);
                default:
                    return Array.from({ length: 10 }, (_, i) => i + 1); // Default to all numbers
            }
        };

        // Determine counts for shape1 and shape2 based on the comparison
        switch (details.comparison1) {
            case 'more':
                countShape1 = randomIntFromInterval(6, 10);
                countShape2 = randomIntFromInterval(1, 5);
                break;
            case 'less':
                countShape1 = randomIntFromInterval(1, 5);
                countShape2 = randomIntFromInterval(6, 10);
                break;
            case 'the same number of':
                const sameCount = randomIntFromInterval(3, 7);
                countShape1 = countShape2 = sameCount;
                break;
            default:
                countShape1 = countShape2 = 5; // Default to equal counts if comparison is undefined
        }

        // Populate the grid with shape1 entities
        for (let i = 0; i < countShape1; i++) {
            grid.push({
                shape: details.shape1,
                color: details.color1,
                number: getNumberForShape(details.mathRelation1, details.number1),
            });
        }

        // Populate the grid with shape2 entities
        for (let i = 0; i < countShape2; i++) {
            grid.push({
                shape: details.shape2,
                color: details.color2,
                number: getNumberForShape(details.mathRelation2, details.number2),
            });
        }

        // Add variations that do not affect the condition
        const additionalEntities = [];
        const addAdditionalEntities = (shape, color, mathRelation, number) => {
            const safeNumbers = violatesNumbers(mathRelation, number);
            const count = randomIntFromInterval(1, 3);
            for (let i = 0; i < count; i++) {
                additionalEntities.push({
                    shape: shape,
                    color: color,
                    number: getRandomElement(safeNumbers),
                });
            }
        };

        addAdditionalEntities(details.shape1, details.color1, details.mathRelation1, details.number1);
        addAdditionalEntities(details.shape2, details.color2, details.mathRelation2, details.number2);

        // Combine main entities and additional entities
        grid = grid.concat(additionalEntities);

        // Arrays of shapes and colors that won't affect the statement
        const safeShapes = shapes.filter(sh => (sh !== details.shape1) && (sh !== details.shape2));
        const safeColors = colors.filter(co => (co !== details.color1) && (co !== details.color2));

        const violates1 = violatesNumbers(details.mathRelation1, details.number1);
        const violates2 = violatesNumbers(details.mathRelation2, details.number2);

        // Safe numbers excluding those that violate shape conditions
        const allNumbers = Array.from({ length: 10 }, (_, i) => i + 1);
        let safeNumbers = allNumbers.filter(nu => !violates1.includes(nu) && !violates2.includes(nu));

        // Fallback: if no safe numbers are available, allow all numbers
        if (safeNumbers.length === 0) {
            safeNumbers = allNumbers;
        }

        // Function to generate a safe random entity that won't affect the statement
        const getSafeRandomEntity = () => {
            let shape = getRandomElement(safeShapes);
            let color = getRandomElement(safeColors);
            let number = getRandomElement(safeNumbers);
            return {
                shape: shape,
                color: color,
                number: number,
            };
        };

        // Introduce violations if satisfies is false
        if (!satisfies) {
            switch (details.comparison1) {
                case 'more':
                    while (countShape1 > countShape2) {
                        grid.push({
                            shape: details.shape2,
                            color: details.color2,
                            number: getNumberForShape(details.mathRelation2, details.number2),
                        });
                        countShape2++;
                    }
                    break;
                case 'less':
                    while (countShape1 < countShape2) {
                        grid.push({
                            shape: details.shape1,
                            color: details.color1,
                            number: getNumberForShape(details.mathRelation1, details.number1),
                        });
                        countShape1++;
                    }
                    break;
                case 'the same number of':
                    if (countShape1 === countShape2) {
                        grid.push({
                            shape: details.shape1,
                            color: details.color1,
                            number: getNumberForShape(details.mathRelation1, details.number1),
                        });
                        countShape1++;
                    }
                    break;
            }
        }

        // Fill the rest of the grid with safe random entities that do not violate the main condition
        while (grid.length < gridSize * gridSize) {
            grid.push(getSafeRandomEntity());
        }

        shuffle(grid);

        return {
            grid: grid,
            satisfies: satisfies
        };
    }
};

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
}
