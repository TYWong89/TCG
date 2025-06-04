exports.seed = async function(knex) {
  await knex('collections').del();
  await knex('collections').insert([
    // user_id 4
    { user_id: 4, card_id: 'clarent-sword-of-peace', count: 1 },
    { user_id: 4, card_id: 'majestic-spirits-crest', count: 1 },
    { user_id: 4, card_id: 'inspiring-call', count: 4 },
    { user_id: 4, card_id: 'aesan-protector', count: 4 },
    { user_id: 4, card_id: 'crux-sight', count: 4 },
    { user_id: 4, card_id: 'lorraine-ascendant-wings', count: 1 },
    { user_id: 4, card_id: 'lorraine-blademaster', count: 1 },
    { user_id: 4, card_id: 'lorraine-crux-knight', count: 1 },
    { user_id: 4, card_id: 'lorraine-spirit-ruler', count: 1 },
    { user_id: 4, card_id: 'lorraine-wandering-warrior', count: 1 },
    { user_id: 4, card_id: 'clarent-reimagined', count: 1 },

    // user_id 3
    { user_id: 3, card_id: 'scepter-of-fascination', count: 1 },
    { user_id: 3, card_id: 'scepter-of-awakening', count: 1 },
    { user_id: 3, card_id: 'sigil-of-budding-embers', count: 1 },
    { user_id: 3, card_id: 'shimmering-refraction', count: 4 },
    { user_id: 3, card_id: 'glimmering-refusal', count: 4 },

    // user_id 1
    { user_id: 1, card_id: 'arcane-blast', count: 3 },
    { user_id: 1, card_id: 'quicksilver-grail', count: 1 },

    // user_id 2
    { user_id: 2, card_id: 'arcane-blast', count: 2 }
  ]);
};