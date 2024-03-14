// Main function
// Test remote add
document.addEventListener('DOMContentLoaded', (event) => {
  const form = document.getElementById('logic-form');
  const input = document.getElementById('formula');
  const resultDiv = document.getElementById('truthTable');
  const errorDiv = document.getElementById('error'); // Ensure there's an element with ID 'error' in your HTML

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    clearResults();


    try {
      const expression = input.value.trim();
      if (!expression) {
        throw new Error('No expression provided');
      }

    } catch (error) {
      console.error('Caught an error:', error); // Debugging
      handleError(error.message);
    }
  });

  // Real-time input validation event listener
  input.addEventListener('input', function () {

    errorDiv.textContent = '';
    errorDiv.style.color = '';

    // Check the current value of the input for invalid characters
    if (this.value.match(/[&*%$#@!]/)) {
      errorDiv.textContent = 'Invalid character detected: Only logical operators and variable names are allowed.';
      errorDiv.style.color = 'red';
      // Optionally, clear the invalid input
      this.value = this.value.replace(/[&*%$#@!]/g, '');
    }
  });

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    clearResults();

    try {
      const expression = input.value.trim();
      if (!expression) {
        throw new Error('No expression provided');
      }

      let tokens = tokenize(expression);
      console.log('Tokens:', tokens); // Debugging



      let arr = generateTruthTableArray(tokens);
      displayTruthTable(arr);
    } catch (error) {
      console.error('Caught an error:', error);
      handleError('Invalid Input: ' + error.message);
    }
  });

  document.querySelector('.btn-delete').addEventListener('click', function () {
    clearInputsAndResults();
  });
});

