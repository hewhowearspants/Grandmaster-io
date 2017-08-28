const Card = require('../models/card');

const cardsController = {};
//find all cards, card collection page
cardsController.index = (req, res) => {
  Card.findAll()
    .then(cards => {
      res.json(cards);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
}
//find ten cards, new user registration
cardsController.findTen = (req,res) => {
  Card.findTen()
  .then(cards => {
    res.json(cards);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
}
//find new one card, get new card page
cardsController.findOne = (req,res) => {
  Card.findOne()
  .then(cards => {
    res.json(cards);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
}

module.exports = cardsController;
