const db = require('../db/config');

const Usercard = {};

// find all users' cards
Usercard.findUserCards = (userId) =>
  db.manyOrNone(`
    SELECT * FROM users_cards
    WHERE user_id = $1
    ORDER BY card_id, id ASC
  `, [userId]);

// add new card to user
Usercard.addToUser = (card, userId) =>
  db.one(`
    INSERT INTO users_cards
    (card_id, name, class, attack, defense, image_url, user_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *
  `,
    [
      card.cardId,
      card.name,
      card.class,
      card.attack,
      card.defense,
      card.imageUrl,
      userId
    ]
  );

// find all counter cards for a specified user
Usercard.findUserCounters = (userId) =>
  db.manyOrNone(`
    SELECT * FROM users_counters
    WHERE user_id = $1
    ORDER BY card_id, id ASC
  `, [userId]);

// add counter card to users_counters
Usercard.addCounter = (card, userId) =>
  db.one(`
    INSERT INTO users_counters
    (name, description, usable_by, card_id, user_id)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `, [card.name, card.description, card.usableBy, card.cardId, userId]);

// edit card name
Usercard.update = (name, id) =>
  db.one(`
    UPDATE users_cards SET
    name = $1
    WHERE id = $2
    RETURNING *
  `, [name, id]);

// delete card
Usercard.destroy = (id) =>
  db.none(`
    DELETE FROM users_cards
    WHERE id = $1
  `, [id]);

Usercard.destroyCounter = (id) =>
  db.none(`
    DELETE FROM users_counters
    WHERE id = $1
  `, [id]);

// get five random cards to prepare for the battle
Usercard.findFiveUserCards = (id) =>
  db.manyOrNone(`
    SELECT * FROM users_cards
    WHERE user_id = $1
    ORDER BY RANDOM()
    LIMIT 5
  `, [id]);

module.exports = Usercard;
