const data = require('./data');
const prototypeQuestions = data.prototypeData;
const util = require('./util');
//const Card = require('./Card');
const Deck = require('./Deck');
//const Turn = require('./Turn');
const Round = require('./Round');


class Game {
  constructor() {
    this.currentRound;
  }

  printMessage(deck, round) {
      console.log(`Welcome to FlashCards! You are playing with ${deck.countCards()} cards.
-----------------------------------------------------------------------`)
  }

  printQuestion(round) {
      util.main(round);
  }

  start() {
    const deck = new Deck(prototypeQuestions.slice(0,2));
    this.currentRound = new Round(deck);
    this.printMessage(deck, this.currentRound);
    this.printQuestion(this.currentRound);
  }
}

module.exports = Game;