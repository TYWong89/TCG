// api/controllers/deckController.js
function makeDeckController(Deck) {
  return {
    async getDecks(req, res) {
      const user_id = req.user.id;
      const decks = await Deck.getUserDecks(user_id);
      res.json({ decks });
    },

    async createDeck(req, res) {
      const user_id = req.user.id;
      const { name } = req.body;
      if (!name) return res.status(400).json({ error: "Deck name required" });

      const [deck] = await Deck.createDeck(user_id, name);
      res.json({ deck });
    },

    async deleteDeck(req, res) {
      const user_id = req.user.id;
      const deck_id = req.params.deckId;
      await Deck.deleteDeck(deck_id, user_id);
      res.json({ success: true });
    },

    async getDeckCards(req, res) {
      const deck_id = req.params.deckId;
      const cards = await Deck.getDeckCards(deck_id);
      res.json({ cards });
    },

    async addCardToDeck(req, res) {
      const deck_id = req.params.deckId;
      const { card_id } = req.body;
      if (!card_id) return res.status(400).json({ error: "card_id required" });

      await Deck.addCardToDeck(deck_id, card_id);
      res.json({ success: true });
    },

    async removeCardFromDeck(req, res) {
      const deck_id = req.params.deckId;
      const card_id = req.params.cardId;
      await Deck.removeCardFromDeck(deck_id, card_id);
      res.json({ success: true });
    }
  };
}

module.exports = makeDeckController;
