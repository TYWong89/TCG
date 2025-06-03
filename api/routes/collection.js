const express = require('express');
const router = express.Router();
const knex = require('../db/knex'); // Adjust path as needed

// GET /api/collection
router.get('/', async (req, res) => {
  const userId = req.user.id;
  const cards = await knex('collection').where({ user_id: userId });
  res.json(cards);
});

// POST /api/collection
router.post('/', async (req, res) => {
  const userId = req.user.id;
  const { card_id } = req.body;
  const existing = await knex('collection').where({ user_id: userId, card_id }).first();
  if (existing) {
    await knex('collection').where({ id: existing.id }).update({ count: existing.count + 1 });
  } else {
    await knex('collection').insert({ user_id: userId, card_id, count: 1 });
  }
  res.json({ success: true });
});

// DELETE /api/collection
router.delete('/', async (req, res) => {
  const userId = req.user.id;
  const { card_id } = req.body;
  const existing = await knex('collection').where({ user_id: userId, card_id }).first();
  if (existing && existing.count > 1) {
    await knex('collection').where({ id: existing.id }).update({ count: existing.count - 1 });
  } else if (existing) {
    await knex('collection').where({ id: existing.id }).del();
  }
  res.json({ success: true });
});

module.exports = router;
