const chai = require('chai');
const expect = chai.expect;

const Deck = require('../src/Deck');
const Card = require('../src/Card');

describe('Deck', () => {
  let card1;
  let card2;
  let card3;
  beforeEach( () => {
    card1 = new Card(1, "what is the biggest dolphin?", ['spinner', 'bottlenose', 'orca'], 'orca');
    card2 = new Card(2, "is octopus smart?", ['yes', 'no', 'maybe'], 'yes');
    card3 = new Card(3, "what is the true color of corals ?", ['blue', 'white', 'yello'], 'white'); 
  })
  describe('initialization', () => {

    it('should be a function', () => {
      expect(Deck).to.be.a('function');
    })

    it('should have an ampty array as default', () => {
      const deck1 = new Deck();
      expect(deck1.cards).to.be.deep.equal([]);
    })

    it('should store a card', () => {
      const deck2 = new Deck([card1]);
      expect(deck2.cards).to.be.deep.equal([card1]);
    })

    it('should store more than one card', () => {
      const deck = new Deck([card2, card3]);

      expect(deck.cards).to.be.deep.equal([card2, card3]);
    })
  })
  describe('countCards()', () => {

    it('should return 0 if there\'s no cards in the deck', () => {
      const deck = new Deck();
      const numOfCards = deck.countCards();
      expect(numOfCards).to.be.equal(0)
    })

    it('should return number of cards in the deck', () => {
      const deck = new Deck([card1, card2, card3]);
      const numOfCards = deck.countCards();

      expect(numOfCards).to.be.equal(3)
    })
  })
})