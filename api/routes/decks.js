const express = require('express');
const Deck = require('../models/Deck');
const makeDeckController = require('../controllers/deckController');
const authenticateToken = require('../middleware/auth');

module.exports = (knex) => {
  const router = express.Router();
  const deckModel = new Deck(knex);
  const deckController = makeDeckController(deckModel);

  router.get('/', authenticateToken, deckController.getDecks);
  router.post('/', authenticateToken, deckController.createDeck);
  router.delete('/:deckId', authenticateToken, deckController.deleteDeck);


  return router;
};
