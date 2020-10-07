const chai = require('chai');
const expect = chai.expect;

const Turn = require('../src/Turn');
const Card = require('../src/Card');
  
describe('Turn', () => {
  let currentCard;

  beforeEach( () => {
    currentCard = new Card(1, "what is the biggest dolphin?", ['spinner', 'bottlenose', 'orca'], 'orca');
  })
  
  describe('initialization', () => {
    it('should be a function', () => {
      expect(Turn).to.be.a('function');
    });

    it('should be an instance of Turn', () => {
      const turn = new Turn();

      expect(turn).to.be.an.instanceof(Turn);
    }); 

    it('should be able to pass in player\'s guess', () => {
      const turn = new Turn('orca', currentCard);
      
      expect(turn.guess).to.equal('orca');
    })

    it('should be able to pass in current card', () => {
      const turn = new Turn('orca', currentCard);
      
      expect(turn.currentCard).to.be.instanceof(Card);
    })
  })

  describe('methods', () => {
    it('should return the guess', () => {
      const turn = new Turn('common', currentCard);
      const guess = turn.returnGuess();

      expect(guess).to.equal('common')
    })

    it('should return the current card', () => {
      const turn = new Turn('unicorn', currentCard);
      const card = turn.returnCard();
      
      expect(card).to.deep.equal(currentCard);
    })

    it('should return true if guess match the correct answer', () => {
      const firstTurn = new Turn('orca', currentCard);
      const answer1 = firstTurn.evaluateGuess();
      
      expect(answer1).to.equal(true);
    })

    it('should return false if guess does match the correct answer', () => {
      const secondTurn = new Turn([], currentCard);
      const answer2 = secondTurn.evaluateGuess();

      expect(answer2).to.equal(false);
    })

    it('should return negative feedback if guess does not match the correct answer', () => {
      const turn = new Turn('Pacific', currentCard);
      const feedback = turn.giveFeedback();

      expect(feedback).to.equal('incorrect!');
    })

    it('should return positive feedback if guess matches the correct answer', () => {
      const turn = new Turn('orca', currentCard);
      const feedback = turn.giveFeedback();

      expect(feedback).to.equal('correct!');
    })

    it('should return negative feedback if there\'s no guess', () => {
      const turn = new Turn('', currentCard);
      const feedback = turn.giveFeedback();

      expect(feedback).to.equal('incorrect!');
    })
  })

})