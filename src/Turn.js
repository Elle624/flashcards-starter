const Card = require('../src/Card');
class Turn {
  constructor(guess, currentCard) {
    this.guess = guess;
    this.currentCard = currentCard || new Card();
  }
  returnGuess() {
    return this.guess;
  }
  returnCard() {
    return this.currentCard;
  }
  evaluateGuess() {
    return this.guess === this.currentCard.correctAnswer ? true : false;
  }
  giveFeedback() {
    return this.evaluateGuess() ? 'correct!' : 'incorrect!';
  }
}

module.exports = Turn;