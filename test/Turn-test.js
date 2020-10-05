const chai = require('chai');
const expect = chai.expect;

const Turn = require('../src/Turn');
const Card = require('../src/Card');
const { assert } = require('chai');
describe('Turn', function() {

  it('should be a function', function() {
    expect(Turn).to.be.a('function');
  });

  it('should be an instance of Turn', function() {
    const turn = new Turn();

    expect(turn).to.be.an.instanceof(Turn);
  }); 

  it('should be able to pass in current card', function() {
    const currentCard = new Card(1, "what is the biggest dolphin?", ['spinner', 'bottlenose', 'orca'], 'orca');
    const turn = new Turn('orca', currentCard);

    expect(turn.currentCard.answers).to.be.deep.equal(['spinner', 'bottlenose', 'orca']);
  })

  it('should be able to pass a different card', function() {
    const currentCard = new Card(2, "is octopus smart?", ['yes', 'no', 'maybe'], 'yes');
    const turn = new Turn('no', currentCard);

    expect(turn.currentCard.correctAnswer).to.be.equal('yes');
  })

  it('should return the guess', function() {
    const currentCard = new Card(3, "what is the true color of corals ?", ['blue', 'white', 'yello'], 'white');
    const turn = new Turn('red', currentCard);
    const guess = turn.returnGuess();

    expect(guess).to.be.equal('red')
  })

  it('should return the current card', function() {
    const currentCard = new Card(4, "how many types of killer whales in the North Pacific?", [10, 5, 3], 3);
    const turn = new Turn(3, currentCard);
    const card = turn.returnCard();
    
    expect(card).to.be.deep.equal({id:4, question: "how many types of killer whales in the North Pacific?", answers: [10, 5, 3], correctAnswer: 3})
  })

  it('should return true if guess match thecorrect answer, otherwise return false', function() {
    const currentCard = new Card(5, "orca vs great white shark, which one will win?", ['orca', 'great white shark', 'not sure'], 'orca');
    const turn = new Turn('orca', currentCard);
    const answer = turn.evaluateGuess();

    expect(answer).to.be.equal(true);
  })

  it('should return feedback accordingly base on if guess match thecorrect answer', function() {
    const currentCard = new Card(6, "where does orca live?", ['Pacific', 'Atlantic', 'all ocean'], 'all ocean');
    const turn = new Turn('Pacific', currentCard);
    const feedback = turn.giveFeedback();

    expect(feedback).to.be.equal('incorrect!');
  })
})