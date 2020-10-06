const Turn = require('../src/Turn');

class Round {
  constructor(deck) {
    this.deck = deck.cards;
    this.turns = 0;
    this.incorrectGuesses = [];
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
    console.log(`** Round over! ** You answered ${this.calculatePercentCorrect()}% of the questions correctly!`);
    return `** Round over! ** You answered ${this.calculatePercentCorrect()}% of the questions correctly!`;
  }
}

module.exports = Round;