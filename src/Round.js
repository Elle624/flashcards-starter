const Turn = require('../src/Turn');

class Round {
  constructor(deck) {
    this.deck = typeof deck === 'object' ? deck.cards : [];
    this.turns = 0;
    this.incorrectGuesses = [];
    this.startTime = Date.now();
  }
  returnCurrentCard() {
    return this.deck[0];
  }
  takeTurn(guess) {
    let turn = new Turn(guess, this.returnCurrentCard());
    if (turn.evaluateGuess() === false) {
      this.incorrectGuesses.push(this.returnCurrentCard().id)
    }
    this.turns += 1;
    this.deck.shift();
    return turn.giveFeedback();
  }
  calculatePercentCorrect() {
    let wrongGuessNum = this.incorrectGuesses.length;
    if (wrongGuessNum >= 1 && this.turns !== 1) {
      return 100 - (Math.round(wrongGuessNum / this.turns * 100));
    } else if (wrongGuessNum === 1 && this.turns === 1) {
      return 0;
    } else {
      return 100;
    }
  }
  endRound() {
    const stopTime = Date.now();
    const min = Math.floor((stopTime - this.startTime) / 1000 / 60);
    const sec = Math.floor((stopTime - this.startTime) / 1000 % 60);
    console.log(`** Round over! ** You answered ${this.calculatePercentCorrect()}% of the questions correctly in ${min} min ${sec} sec! \n
    Below is the index of the questions that you answered wrong: \n
    ${this.incorrectGuesses}`);
    process.exit();
  }
}

module.exports = Round;