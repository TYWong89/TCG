const express = require('express');
const Collection = require('../models/Collection');
const makeCollectionController = require('../controllers/collectionController');
const authenticate = require('../middleware/auth');

module.exports = (knex) => {
  const router = express.Router();

  const collectionModel = new Collection(knex);
  const collectionController = makeCollectionController(collectionModel);

  router.use(authenticate);

  router.get('/', collectionController.getCollection);
  router.post('/', collectionController.addCard);
  router.delete('/:cardId', collectionController.removeCard);

  return router;
};
