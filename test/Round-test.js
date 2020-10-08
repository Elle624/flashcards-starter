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

    it('should start a round with a deck full of cards', () => {
      expect(round.deck).to.deep.equal([card1, card2, card3]);
    })

    it('should start a round with a deck only store cards in', () => {
      const round = new Round('Elle', true, 3);

      expect(round.deck).to.deep.equal([]);
    })

    it('should have a default value of 0 in the beginning of a round', () => {
      expect(round.turns).to.equal(0);
    })

    it('should have a default value of an empty array in the beginning of a round', () => {
      expect(round.incorrectGuesses).to.deep.equal([]);
    })
  })

  describe('returnCurrentCard(), takeTurn()', () => {

    it('should return the current card', () => {
      const currentCard = round.returnCurrentCard();

      expect(currentCard).to.deep.equal(card1);
    })

    it('should update turns count', () => {
      round.takeTurn('');
      round.takeTurn('yes')

      expect(round.turns).to.equal(2);
    })

    it('should gives feedback if guess is correct', () => {
      const result = round.takeTurn('orca');

      expect(result).to.equal('correct!');  
    })

    it('should gives feedback if guess is wrong', () => {
      const result = round.takeTurn('not sure');

      expect(result).to.equal('incorrect!');  
    })

    it('if guess wrong, it should evaluates guesses, and stores ids of incorrect guesses', () => {
      round.takeTurn('spinner');
      const wrongAnswerId = round.incorrectGuesses[0];

      expect(round.incorrectGuesses).to.deep.equal([1]);
      expect(wrongAnswerId).to.equal(1);  
    })

    it('should also update current card after each turn', () => {
      round.takeTurn('orca');
      round.takeTurn('maybe');

      expect(round.returnCurrentCard()).to.deep.equal(card3);
    })
  })
  describe('calculatePercentCorrect()', () => {
    
    it('should return 100 percent of correct guessing if first guess is correct', () => {
      round.takeTurn('orca');
      const percentCorrect = round.calculatePercentCorrect();

      expect(percentCorrect).to.equal(100);
    })

    it('should return 0 percent of correct guessing if first guess is wrong', () => {
      round.takeTurn('maybe');
      const percentCorrect = round.calculatePercentCorrect();

      expect(percentCorrect).to.equal(0);
    })

    it('should return percentage of correct guessing', () => {
      round.takeTurn('orca');
      round.takeTurn('maybe');
      round.takeTurn('white');
      const percentCorrect = round.calculatePercentCorrect();

      expect(percentCorrect).to.equal(67);
    })
  })
})