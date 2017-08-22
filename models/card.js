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

module.exports = Card;
