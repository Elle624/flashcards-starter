const chai = require('chai');
const expect = chai.expect;

const Deck = require('../src/Deck');
const Card = require('../src/Card');

describe('Deck', () => {
  let card1, card2, card3;
 
  beforeEach( () => {
    card1 = new Card(1, "what is the biggest dolphin?", ['spinner', 'bottlenose', 'orca'], 'orca');
    card2 = new Card(2, "is octopus smart?", ['yes', 'no', 'maybe'], 'yes');
    card3 = new Card(3, "what is the true color of corals ?", ['blue', 'white', 'yello'], 'white'); 
  })
  describe('initialization', () => {

    it('should be a function', () => {
      expect(Deck).to.be.a('function');
    })

    it('should be an instance of Deck', () => {
      const deck = new Deck();

      expect(deck).to.be.an.instanceof(Deck);
    });
    
    it('should have an ampty array as default', () => {
      const deck = new Deck();

      expect(deck.cards).to.deep.equal([]);
    })

    it('should store a card', () => {
      const deck2 = new Deck([card1]);

      expect(deck2.cards).to.deep.equal([card1]);
    })

    it('should store more than one card', () => {
      const deck = new Deck([card2, card3]);

      expect(deck.cards).to.deep.equal([card2, card3]);
    })

    it('should not store invalid cards', () => {
      const deck = new Deck('Elle', true);

      expect(deck.cards).to.deep.equal([]);
    })
  })
  describe('countCards()', () => {

    it('should return 0 if there\'s no cards in the deck', () => {
      const deck = new Deck();
      const numOfCards = deck.countCards();

      expect(numOfCards).to.equal(0);
    })

    it('should return number of cards in the deck', () => {
      const deck = new Deck([card1, card2, card3]);
      const numOfCards = deck.countCards();

      expect(numOfCards).to.equal(3);
    })

    it('should return 0 if there\'s invalid cards in the deck', () => {
      const deck = new Deck('Isabelle');
      const numOfCards = deck.countCards();

      expect(numOfCards).to.equal(0);
    })
  })

})