const Card = require('../models/card');

const cardsController = {};

cardsController.index = (req, res) => {
  Card.findAll()
    .then((cards) => {
      res.json(cards);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
}

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
