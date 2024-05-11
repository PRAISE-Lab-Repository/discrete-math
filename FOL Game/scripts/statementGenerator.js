import { positions, getRandomElement, colors, colorNames, shapes, numbers, relations, comparisons, mathRelations, orders, directions, equality } from './utils.js';
import { templates } from './templateBank/templates.js';

function generateStatement() {
    const template = getRandomElement(templates);
    //const template = template_02;

    const range1 = Math.floor(Math.random() * 3) + 1;

    const equality1 = getRandomElement(equality);

    const position1 = getRandomElement(positions);

    const order1 = getRandomElement(orders);

    const direction1 = getRandomElement(directions);

    // Randomly select shapes and ensure they do not repeat
    const shape1 = getRandomElement(shapes);
    const remainingShapes1 = shapes.filter(s => s !== shape1);
    const shape2 = getRandomElement(remainingShapes1);
    const remainingShapes2 = remainingShapes1.filter(s => s !== shape2);
    const shape3 = getRandomElement(remainingShapes2);

    // Randomly select colors and numbers
    const color1 = getRandomElement(colors);
    const color2 = getRandomElement(colors);
    const color3 = getRandomElement(colors);
    const number1 = getRandomElement(numbers);
    const number2 = getRandomElement(numbers);
    const number3 = getRandomElement(numbers);

    const comparison1 = getRandomElement(comparisons);
    const mathRelation1 = getRandomElement(mathRelations);

    const comparison2 = getRandomElement(comparisons);
    const mathRelation2 = getRandomElement(mathRelations);

    // Randomly select relationships
    const relation1 = getRandomElement(relations);
    const relation2 = getRandomElement(relations.filter(r => r.key !== relation1.key));

    // Modify the template text to include dynamic relationships
    const statementText = template.text
        .replace(/\{position1\}/g, position1)
        .replace(/\{shape1\}/g, shape1)
        .replace(/\{shape2\}/g, shape2)
        .replace(/\{shape3\}/g, shape3)
        .replace(/\{color1\}/g, colorNames[color1])
        .replace(/\{color2\}/g, colorNames[color2])
        .replace(/\{color3\}/g, colorNames[color3])
        .replace(/\{number1\}/g, number1.toString())
        .replace(/\{number2\}/g, number2.toString())
        .replace(/\{number3\}/g, number3.toString())
        .replace(/\{relation1\}/g, relation1.key)
        .replace(/\{comparison1\}/g, comparison1)
        .replace(/\{comparison2\}/g, comparison2)
        .replace(/\{mathRelation1\}/g, mathRelation1)
        .replace(/\{mathRelation2\}/g, mathRelation2)
        .replace(/\{range1\}/g, range1)
        .replace(/\{order1\}/g, order1)
        .replace(/\{equality1\}/g, equality1)
        .replace(/\{direction1\}/g, direction1)
        .replace(/\{relation2\}/g, relation2.key);

    // Construct the details for the grid generator
    const statementDetails = {
        text: statementText,
        template: template,
        details: {
            position1: position1,
            shape1: shape1, color1: color1, number1: number1,
            shape2: shape2, color2: color2, number2: number2,
            shape3: shape3, color3: color3, number3: number3,
            relation1: relation1,
            relation2: relation2,
            mathRelation1: mathRelation1,
            mathRelation2: mathRelation2,
            comparison1: comparison1,
            comparison2: comparison2,

            direction1: direction1,
            order1: order1,
            equality1: equality1,
            range1: range1

        }
    };

    console.log(`Generated statement: ${statementText}`);
    return statementDetails;
}

export { generateStatement };
