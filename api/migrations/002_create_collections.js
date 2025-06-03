exports.up = function(knex) {
  return knex.schema.createTable('collections', table => {
    table.increments('id').primary();
    table.integer('user_id').references('users.id').onDelete('CASCADE');
    table.string('card_id').notNullable(); // from GATCG API
    table.integer('count').defaultTo(1);
    table.unique(['user_id', 'card_id']);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('collections');
};
