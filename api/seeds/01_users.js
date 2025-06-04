exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del();
  // Inserts seed entries
  await knex('users').insert([
    { id: 1, username: 'testuser', password_hash: '$2a$10$Z31y6kV7Dd6/5vX4q/vDUOsu4CvDb67Kg6kNo9sZJUTnqpJ9vGhye' }, // password: testpass
    { id: 2, username: 'demo', password_hash: '$2a$10$uf0ZYj6QuYiyhq7cnQy7PuyptjIhtJ6NoZBy4X3f7gQyDBZPi2dC2' },   // password: demopass
    { id: 3, username: 'Diaochan', password_hash: '$2a$10$.AQKD9d2Sa1r0dwW7mk1kONpiGmthM9zmYIwXsKQ3oj01E.hKwESO'}, // password: Enchantress
    { id: 4, username: 'Lorraine', password_hash: '$2a$10$PtJU5EKLT9lnv4zXW3x2ieCcryvxETEVxCaFjqySQA6RFmJlJGy8W'} // password: Blademaster
]);
};