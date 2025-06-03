exports.up = function(knex) {
  return knex.schema.createTable('decks', table => {
    table.increments('id').primary();
    table.integer('user_id').references('users.id').onDelete('CASCADE');
    table.string('name').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('decks');
};
