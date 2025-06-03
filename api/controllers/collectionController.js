// api/controllers/collectionController.js
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

        await Collection.removeCardFromCollection(user_id, card_id);
        res.json({ success: true });
      } catch (error) {
        res.status(500).json({ error: "Failed to remove card from collection" });
      }
    }
  };
}

module.exports = makeCollectionController;
