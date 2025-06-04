function makeCollectionController(Collection) {
  return {
    async getCollection(req, res) {
      try {
        const user_id = req.user.id;
        const collection = await Collection.getUserCollection(user_id);
        res.json({ collection });
      } catch (error) {
        res.status(500).json({ error: "Failed to get collection" });
      }
    },

    async addCard(req, res) {
      try {
        const user_id = req.user.id;
        const { card_id } = req.body;
        if (!card_id) return res.status(400).json({ error: "card_id required" });

        await Collection.addCardToCollection(user_id, card_id);
        res.json({ success: true });
      } catch (error) {
        res.status(500).json({ error: "Failed to add card to collection" });
      }
    },

    async removeCard(req, res) {
      try {
        const user_id = req.user.id;
        const card_id = req.params.cardId;
        if (!card_id) return res.status(400).json({ error: "card_id required" });

        // Get the current card entry for this user and card
        const collectionRow = await Collection.getUserCard(user_id, card_id);
        if (!collectionRow) return res.status(404).json({ error: "Card not in collection" });

        if (collectionRow.count > 1) {
          // Decrement count by 1
          await Collection.updateCardCount(user_id, card_id, collectionRow.count - 1);
        } else {
          // Remove the card completely
          await Collection.removeCardFromCollection(user_id, card_id);
        }
        res.json({ success: true });
      } catch (error) {
        res.status(500).json({ error: "Failed to remove card from collection" });
      }
    }
  };
}

module.exports = makeCollectionController;
