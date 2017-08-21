const db = require('../db/config');

const Card = {};

Card.findAll = () => {
  return db.query('SELECT * FROM cards');
}

module.exports = Card;