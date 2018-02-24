var Letter = require("./Letter.js");

function Word(targetWord){

	for (var i = 0; i < targetWord.length; i++) {
		this[i] = new Letter(targetWord[i]);
	};
}; 

Word.prototype.displayWord = function() {
	// create empty array
	var lettersArray = [];

	for (letter in this) {
		if (this[letter].showLetter)
			lettersArray.push(this[letter].showLetter());
	};

	return lettersArray.join(" ");
}; 

Word.prototype.checkIfWordContains = function(guessedLetter) {
	for(letter in this) {
		if (this[letter].isThisLetter)
			this[letter].isThisLetter(guessedLetter);
	};
}; 

module.exports = Word;