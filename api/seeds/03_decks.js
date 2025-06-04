exports.seed = async function(knex) {
  await knex('decks').del();
  await knex('decks').insert([
    { id: 1, user_id: 1, name: 'Testuser Main Deck' },
    { id: 2, user_id: 2, name: 'Demo Deck' },
    { id: 3, user_id: 3, name: 'WindAstra Arisanna Deck' },
    { id: 4, user_id: 4, name: 'Lorraine Blademaster Deck' }
  ]);
};