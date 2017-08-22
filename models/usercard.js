const db = require('../db/config');

const Usercard = {};

Usercard.findUserCards = userid => {
    return db.manyOrNone(`
    SELECT * FROM users_cards
    WHERE user_id = $1
    `, [userid]);
};

Usercard.addToUser = (card,userid) => {
  return db.one(`
  INSERT INTO users_cards
  (card_id, name, class, attack, defense, image_url, user_id)
  VALUES ($1, $2, $3, $4, $5, $6, $7)
  RETURNING *
  `, [card.cardId, card.name, card.class, card.attack, card.defense, card.imageUrl, userid]);
};


Usercard.update = (card, id)=>{
  return db.one(`
  UPDATE users_cards SET
  name = $1,
  WHERE id = $2
  RETURNING *
  `,[card.name, card.id])
}

Usercard.destroy = (id) => {
return db.none(`
  DELETE FROM users_cards
  WHERE id = $1
  `,[id]);
}

module.exports = Usercard;