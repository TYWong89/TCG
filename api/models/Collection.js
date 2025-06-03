// api/models/Collection.js
class Collection {
  constructor(knex) {
    this.knex = knex;
  }

  async getUserCollection(user_id) {
    return this.knex('collections').where({ user_id });
  }

  async addCardToCollection(user_id, card_id) {
    // If card already in collection, increment count
    const existing = await this.knex('collections').where({ user_id, card_id }).first();
    if (existing) {
      return this.knex('collections')
        .where({ user_id, card_id })
        .update({ count: existing.count + 1 });
    }
    // Otherwise insert new
    return this.knex('collections').insert({ user_id, card_id, count: 1 });
  }

  async removeCardFromCollection(user_id, card_id) {
    // If more than 1, decrement; else, delete
    const existing = await this.knex('collections').where({ user_id, card_id }).first();
    if (existing && existing.count > 1) {
      return this.knex('collections')
        .where({ user_id, card_id })
        .update({ count: existing.count - 1 });
    }
    return this.knex('collections').where({ user_id, card_id }).del();
  }
}

module.exports = Collection;
