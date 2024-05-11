# Grid-based Logic Game

This project implements a grid-based logic game where various templates define rules for the placement of shapes and colors within a grid. Each template is designed to test logical thinking and pattern recognition.

## Project Structure

The project is organized into several key directories and files:

- `utils.js`: Contains utility functions used across the project such as random number generation, element selection, etc.
- `templateBanks/`: Folder containing individual template modules, each defining a unique game rule.
- `index.html`: The main HTML file for the game interface.
- `styles.css`: Stylesheet for customizing the appearance of the game.
- `main.js`: The main JavaScript file that handles game initialization and logic.

## Templates

Each template in the `templateBanks/` directory implements a specific rule or condition that must be satisfied or violated within the game grid. 


## Usage


- Run the following command in the terminal under the game directory:
•	python -m http.server 8000
- Open a web browser and navigate to http://localhost:8000 to start the game.

Once the game is loaded in your browser, you can:

- Start the game using the "Start Game" button.
- Follow on-screen prompts to satisfy or violate the conditions specified by the loaded template.
- Use the "Next Question" button to load new challenges.

