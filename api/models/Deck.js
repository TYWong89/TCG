// api/models/Deck.js
class Deck {
  constructor(knex) {
    this.knex = knex;
  }

  async getUserDecks(user_id) {
    return this.knex('decks').where({ user_id });
  }

  async createDeck(user_id, name) {
    return this.knex('decks').insert({ user_id, name }).returning(['id', 'name']);
  }

  async deleteDeck(deck_id, user_id) {
    // Only allow user to delete their own deck
    return this.knex('decks').where({ id: deck_id, user_id }).del();
  }

  async getDeckCards(deck_id) {
    return this.knex('deck_cards').where({ deck_id });
  }

  async addCardToDeck(deck_id, card_id) {
    const existing = await this.knex('deck_cards').where({ deck_id, card_id }).first();
    if (existing) {
      return this.knex('deck_cards')
        .where({ deck_id, card_id })
        .update({ count: existing.count + 1 });
    }
    return this.knex('deck_cards').insert({ deck_id, card_id, count: 1 });
  }

  async removeCardFromDeck(deck_id, card_id) {
    const existing = await this.knex('deck_cards').where({ deck_id, card_id }).first();
    if (existing && existing.count > 1) {
      return this.knex('deck_cards')
        .where({ deck_id, card_id })
        .update({ count: existing.count - 1 });
    }
    return this.knex('deck_cards').where({ deck_id, card_id }).del();
  }
}

module.exports = Deck;
