const db = require('../db/config');

const Card = {};

Card.findAll = () => {
  return db.query('SELECT * FROM cards');
}

Card.findTen = () => {
  return db.query(`
  SELECT * FROM cards
  WHERE id > 0
  ORDER BY RANDOM()
  LIMIT 10
  `);
}

Card.addToUser = (card,userid) => {
  return db.one(`
  INSERT INTO users_cards
  (card_id, name, class, attack, defense, user_id)
  VALUES ($1, $2, $3, $4, $5, $6)
  RETURNING *
  `, [card.cardId, card.name, card.class, card.attack, card.defense, userid]);
}

Card.update = (card,id)=>{
    return db.one(`
    UPDATE users_cards SET
    name=$1,
    WHERE card_id=$2
    RETURNING *
    `,[card.name, card.cardId])
}

Card.destroy = (id) => {
  return db.none(`
    DELETE FROM users_cards
    WHERE id=$1
    `,[id]);
}


module.exports = Card;
