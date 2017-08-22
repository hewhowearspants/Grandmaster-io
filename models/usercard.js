const db=require('../db/config');

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

module.exports=Usercard;