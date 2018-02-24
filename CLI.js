var inquirer = require("inquirer");
var colors = require("colors");
var Game = require("./Game.js");

colors.setTheme({
	silly: 'rainbow',
	input: 'grey',
	verbose: 'cyan',
	prompt: 'grey',
	info: 'green',
	data: 'grey',
	help: 'cyan',
	warn: 'yellow',
	debug: 'blue',
	error: 'red'
});

function newGame () {
	// prompt user to pick a category
	readyPrompt = {
		type: "list",
		message: "Choose a category:".yellow,
		choices: ["Superheroes", "Classmates"],
		name: "category"
	};

	inquirer.prompt(readyPrompt).then(response => {
		// create new game object using the user's response
		var game = new Game(response.category.toLowerCase());
		// display empty word
		clearScreen();
		console.log(`\n  ${game.displayWord}\n`);
		// initiate the user input loop
		guessLoop(game);

	}); // inquirer.gameTypePrompt()
}; // newGame(){}

function guessLoop(game) {
	// query guess
	function guessALetter() {
		var guessALetterPrompt = {
			type: "input",
			message: "Guess a letter!".input,
			name: "guessedLetter"
		};

		return inquirer.prompt(guessALetterPrompt)
	}; // guessALetter(){}

	// create promise
	var guessAllLetters = Promise.resolve();

	// if game is not over, run input loop using promise
	if (game.gameOver === false) {

		guessAllLetters = guessAllLetters
		.then(guessALetter)
		.then(response => {
			clearScreen();
			game.evaluateLetter(response.guessedLetter.trim().toUpperCase())
		})
		.then(() => console.log(`\nIncorrect Guesses: ${game.displayIncorrectGuesses}`))
		.then(() => console.log(`Lives Remaining: ${game.livesRemaining}`))
		.then(() => console.log(`\n  ${game.displayWord}\n`))
		.then(() => game.evaluateGameState())
		.then(() => guessLoop(game))

	} else {
		// if game is over, prompt to play again
		var playAgainPrompt = {
			type: "list",
			message: "Play again?",
			choices: ["Yes!", "No"],
			name: "ready"
		};

		inquirer.prompt(playAgainPrompt).then(response => {
			if(response.ready === "Yes!") {
				clearScreen();
				newGame();
			} else {
				clearScreen();
				return;
			};
		});
	}; // if/else gameOver(){}
}; // guessLoop(){}

function clearScreen () {
	process.stdout.write('\x1B[2J\x1B[0f');
}; // clearScreen(){}

// initialize game
clearScreen();
console.log("Welcome to Hangman!".silly.bold);
newGame();