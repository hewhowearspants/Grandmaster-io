const db = require('../db/config');

const Card = {};
//Find all cards, for the card collection page
Card.findAll = () => {
  return db.query('SELECT * FROM cards');
}
//Find random ten cards, for new users registration
Card.findTen = () => {
  return db.query(`
  SELECT * FROM cards
  ORDER BY RANDOM()
  LIMIT 10
  `);
}
//Find random one card, for 'get new card'
Card.findOne = () => {
  return db.query(`
  SELECT * FROM cards
  ORDER BY RANDOM()
  LIMIT 1
  `);
}

module.exports = Card;
