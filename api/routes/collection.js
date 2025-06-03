const express = require('express');
const Collection = require('../models/Collection');
const makeCollectionController = require('../controllers/collectionController');

module.exports = (knex) => {
  const router = express.Router();

  // Instantiate model and controller
  const collectionModel = new Collection(knex);
  const collectionController = makeCollectionController(collectionModel);

  // Route definitions
  router.get('/', collectionController.getCollection);
  router.post('/', collectionController.addCard);
  // Use DELETE /:cardId for RESTful API
  router.delete('/:cardId', collectionController.removeCard);

  return router;
};
