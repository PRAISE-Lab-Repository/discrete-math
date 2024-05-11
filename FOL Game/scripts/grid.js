// grid.js
function clearGrid() {
    const gridContainer = document.getElementById('grid-container');
    gridContainer.innerHTML = '';
}

function createSvgShape(shape, color, number) {
    const namespace = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(namespace, 'svg');
    svg.setAttribute('viewBox', '0 0 120 120');
    svg.setAttribute('class', 'shape');

    let shapeElement;
    const textElement = document.createElementNS(namespace, 'text');

    switch (shape) {
        case 'circle':
            shapeElement = document.createElementNS(namespace, 'circle');
            shapeElement.setAttribute('cx', '60');
            shapeElement.setAttribute('cy', '60');
            shapeElement.setAttribute('r', '50');
            break;
        case 'square':
            shapeElement = document.createElementNS(namespace, 'rect');
            shapeElement.setAttribute('x', '10');
            shapeElement.setAttribute('y', '10');
            shapeElement.setAttribute('width', '100');
            shapeElement.setAttribute('height', '100');
            break;
        case 'triangle':
            // Adjusted points for a visually centered triangle
            shapeElement = document.createElementNS(namespace, 'polygon');
            shapeElement.setAttribute('points', '60,10 110,110 10,110');
            break;
    }

    shapeElement.setAttribute('fill', color);
    svg.appendChild(shapeElement);

    // Adjust text positioning for visual consistency
    textElement.setAttribute('x', '50%');
    textElement.setAttribute('y', '55%');
    textElement.setAttribute('dominant-baseline', 'middle');
    textElement.setAttribute('text-anchor', 'middle');
    textElement.setAttribute('fill', 'black');
    textElement.setAttribute('font-size', '24');
    textElement.textContent = number;
    svg.appendChild(textElement);

    return svg;
}

function populateGrid(gridData) {
    const gridContainer = document.getElementById('grid-container');
    gridContainer.innerHTML = '';

    gridData.forEach(item => {
        const cell = document.createElement('div');
        cell.className = 'cell';
        const svg = createSvgShape(item.shape, item.color, item.number);
        cell.appendChild(svg);
        gridContainer.appendChild(cell);
    });
}



function displayGrid(gridData) {

    clearGrid();
    populateGrid(gridData);
}

export { clearGrid, populateGrid, displayGrid };
