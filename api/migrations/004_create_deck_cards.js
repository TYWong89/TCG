exports.up = function(knex) {
  return knex.schema.createTable('deck_cards', table => {
    table.increments('id').primary();
    table.integer('deck_id').references('decks.id').onDelete('CASCADE');
    table.string('card_id').notNullable(); // from GATCG API
    table.integer('count').defaultTo(1);
    table.unique(['deck_id', 'card_id']);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('deck_cards');
};
