const db = require('../db/config');

const Card = {};

// Find all cards, for the card collection page
Card.findAll = () => db.query("SELECT * FROM cards");

// Find random ten cards, for new users registration
Card.findTen = () =>
  db.query(`
    SELECT * FROM cards
    ORDER BY RANDOM()
    LIMIT 10
  `);

// Find random one card, for 'get new card'
Card.findOne = () =>
  db.query(`
    SELECT * FROM cards
    ORDER BY RANDOM()
    LIMIT 1
  `);

// Find a random card within a limited range
Card.findPremiumOne = (num) =>
  db.query(`
    SELECT * FROM cards
    where id > $1
    ORDER BY RANDOM()
    LIMIT 1
  `, [num]);

// Select a random counter card
Card.findCounter = () => 
  db.query(`
    SELECT * FROM counter_cards
    ORDER BY RANDOM()
    LIMIT 1
  `);


module.exports = Card;
