// api/models/User.js
class User {
  constructor(knex) {
    this.knex = knex;
  }

  async findByUsername(username) {
    return this.knex('users').where({ username }).first();
  }

  async createUser(username, password_hash) {
    return this.knex('users')
      .insert({ username, password_hash })
      .returning(['id', 'username']);
  }

  async findById(id) {
    return this.knex('users').where({ id }).first();
  }
}

module.exports = User;
