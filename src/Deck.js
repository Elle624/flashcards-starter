class Deck {
  constructor(cards) {
    this.cards = typeof cards === "object" ? cards : [];
  }
  countCards() {
    return this.cards.length;
  }
}

module.exports = Deck;
