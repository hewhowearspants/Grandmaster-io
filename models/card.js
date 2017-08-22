const db = require('../db/config');

const Card = {};

Card.findAll = () => {
  return db.query('SELECT * FROM cards');
}

Card.findTen = () => {
  return db.query(`
  SELECT * FROM cards
  ORDER BY RANDOM()
  LIMIT 10
  `);
}

Card.findOne = () => {
  return db.query(`
  SELECT * FROM cards
  ORDER BY RANDOM()
  LIMIT 1
  `);
}

module.exports = Card;
