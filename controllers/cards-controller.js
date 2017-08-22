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

cardsController.update = (req, res) => {
  card.update({
    name: req.body.name,
  }, req.params.id)
  .then(card => {
    res.json(card);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
}

cardsController.delete = (req, res) => {
  Card.destroy(req.params.id)
  .then(() => {
    console.log(deleted);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
}

module.exports = cardsController;
