exports.seed = async function(knex) {
  await knex('deck_cards').del();
  await knex('deck_cards').insert([
    // Deck 1 (Testuser) contains arcane-blast x2, quicksilver-grail x1
    { deck_id: 1, card_id: 'arcane-blast', count: 2 },
    { deck_id: 1, card_id: 'quicksilver-grail', count: 1 },
    // Deck 2 (Demo) contains arcane-blast x1
    { deck_id: 2, card_id: 'arcane-blast', count: 1 }
  ]);
};