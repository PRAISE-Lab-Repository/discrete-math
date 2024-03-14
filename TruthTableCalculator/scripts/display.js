// Display the generated truth table on the webpage
// Test
function displayTruthTable(truthTableArray) {

    const table = document.createElement('table');
    table.setAttribute('border', '1');

    truthTableArray.forEach((row, index) => {
        const tr = document.createElement('tr');
        row.forEach(cell => {
            const cellElement = index === 0 ? document.createElement('th') : document.createElement('td');
            cellElement.textContent = cell;
            tr.appendChild(cellElement);
        });
        table.appendChild(tr);
    });

    const resultDiv = document.getElementById('truthTable');
    resultDiv.innerHTML = '';
    resultDiv.appendChild(table);
}
