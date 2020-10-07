const chai = require('chai');
const expect = chai.expect;

const Round = require('../src/Round');
const Deck = require('../src/Deck');
const Card = require('../src/Card');

describe('Round', () => {
  let card1, card2, card3, deck, round;
  
  beforeEach( () => {
    card1 = new Card(1, "what is the biggest dolphin?", ['spinner', 'bottlenose', 'orca'], 'orca');
    card2 = new Card(2, "is octopus smart?", ['yes', 'no', 'maybe'], 'yes');
    card3 = new Card(3, "what is the true color of corals ?", ['blue', 'white', 'yello'], 'white');
    deck = new Deck([card1, card2, card3]);
    round = new Round(deck);
  })

  describe('initialization', () => {

    it('should be a function', () => {
      expect(Round).to.be.a('function');
    })

    it('should be an instance of Round', () => {
      const round = new Round();
      
      expect(round).to.be.an.instanceof(Round);
    });

    it('should store cards in a deck', () => {
      expect(round.deck).to.be.deep.equal([card1, card2, card3]);
    })

    it('should have a default value of 0', () => {
      expect(round.turns).to.be.equal(0);
    })

    it('should have a default value of an empty array', () => {
      expect(round.incorrectGuesses).to.be.deep.equal([]);
    })
  })

  describe('returnCurrentCard(), takeTurn()', () => {

    it('should return the current card', () => {
      const currentCard = round.returnCurrentCard();

      expect(currentCard).to.be.deep.equal(card1);
    })

    it('should update turns count, evaluates guesses, gives feedback if guess is correct', () => {
      const result = round.takeTurn('orca');

      expect(round.turns).to.be.equal(1);
      expect(round.incorrectGuesses).to.be.deep.equal([]);
      expect(result).to.be.equal('correct!');  
    })

    it('if guess wrong, it should update turns count, evaluates guesses, gives feedback, and stores ids of incorrect guesses', () => {
      const result = round.takeTurn('spinner');

      expect(round.turns).to.be.equal(1);
      expect(round.incorrectGuesses).to.be.deep.equal([1]);
      expect(result).to.be.equal('incorrect!');  
    })
    it('should also update current card after each turn', () => {
      round.takeTurn('orca');
      round.takeTurn('maybe');

      expect(round.returnCurrentCard()).to.be.deep.equal(card3);
    })
  })
  describe('calculatePercentCorrect()', () => {
    
    it('should return 100 percent of correct guessing if first guess is correct', () => {
      round.takeTurn('orca');
      const percentCorrect = round.calculatePercentCorrect();

      expect(percentCorrect).to.be.equal(100);
    })

    it('should return 0 percent of correct guessing if first guess is wrong', () => {
      round.takeTurn('maybe');
      const percentCorrect = round.calculatePercentCorrect();

      expect(percentCorrect).to.be.equal(0);
    })

    it('should return percentage of correct guessing', () => {
      round.takeTurn('orca');
      round.takeTurn('maybe');
      round.takeTurn('white');
      const percentCorrect = round.calculatePercentCorrect();

      expect(percentCorrect).to.be.equal(67);
    })
  })
})