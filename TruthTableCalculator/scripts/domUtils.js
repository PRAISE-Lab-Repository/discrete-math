// Functions to handle DOM manipulation for error handling and clearing inputs/results
function handleError(message) {
    clearResults();
    const resultDiv = document.getElementById('error');
    resultDiv.textContent = message;
    resultDiv.style.color = 'red';
}

function clearInputsAndResults() {
    const input = document.getElementById('formula');
    input.value = '';
    clearResults();
}

function clearResults() {
    const resultDiv = document.getElementById('truthTable');
    const errorMessage = document.getElementById('error');
    resultDiv.innerHTML = '';
    errorMessage.innerHTML = '';
}

function toggleSymbolGuidance() {
    const modal = document.getElementById("symbolGuidanceModal");
    modal.style.display = modal.style.display === "block" ? "none" : "block";
}

