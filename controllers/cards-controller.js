const Card = require('../models/card');

const cardsController={};

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

cardsController.addToUser = (req, res) => {
  Card.addToUser({
    cardId: req.body.cardId,
    name: req.body.name,
    class: req.body.class,
    attack: req.body.attack,
    defense: req.body.defense,
  }, req.user.id)
  .then(card => {
    res.json(card);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
}

module.exports = cardsController;