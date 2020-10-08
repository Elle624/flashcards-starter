const chai = require('chai');
const expect = chai.expect;
const Card = require('../src/Card');
const Round = require('../src/Round');
const Game = require('../src/Game');

describe('Game', () => {

  let game;
  beforeEach( () => {
    game = new Game();
  })

  it('should be a function', () => {
    expect(Game).to.be.a('function');
  })

  it('should be an instance of Game', () => {
    expect(game).to.be.an.instanceof(Game);
  })

  it('current round should be default to undefined before starting a game', () => {
    expect(game.currentRound).to.equal(undefined);
  })

  it('should keep track of current round after game start', () => {
    game.start();

    expect(game.currentRound).to.be.an.instanceof(Round);
  })

  it('should have no cards before starting a game', () => {
    expect(game.cards).to.deep.equal([]);
  })

  it('should create Cards instances after game start', () => {
    game.start();
    const cardIsCard = game.cards.every(card => card instanceof Card);
    
    expect(cardIsCard).to.equal(true);
  })

  it('should have 30 cards in a deck once game started', () => {
    game.start();

    expect(game.cards.length).to.equal(30);
  })

  it('should not have a deck before game started', () => {
    expect(game.deck).to.equal(undefined);
  })

  it('should have a deck after game started', () => {
    game.start();
    const gameDeck = !!game.deck;

    expect(gameDeck).to.equal(true);
  })

})
