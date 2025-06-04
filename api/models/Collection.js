class Collection {
  constructor(knex) {
    this.knex = knex;
  }

  // Get the full collection for a user
  async getUserCollection(user_id) {
    return this.knex('collections')
      .select('card_id', 'count')
      .where({ user_id });
  }

  // Add a card to the collection (or increment the count if it exists)
  async addCardToCollection(user_id, card_id) {
    const existing = await this.knex('collections')
      .where({ user_id, card_id })
      .first();

    if (existing) {
      await this.knex('collections')
        .where({ user_id, card_id })
        .update({ count: existing.count + 1 });
    } else {
      await this.knex('collections')
        .insert({ user_id, card_id, count: 1 });
    }
  }

  // Get a single card row for this user and card_id
  async getUserCard(user_id, card_id) {
    return this.knex('collections')
      .where({ user_id, card_id })
      .first();
  }

  // Update the count of a specific card for this user
  async updateCardCount(user_id, card_id, newCount) {
    return this.knex('collections')
      .where({ user_id, card_id })
      .update({ count: newCount });
  }

  // Remove the card row entirely from the collection
  async removeCardFromCollection(user_id, card_id) {
    return this.knex('collections')
      .where({ user_id, card_id })
      .del();
  }
}

module.exports = Collection;
