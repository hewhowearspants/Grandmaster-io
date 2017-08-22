const Usercard = require('../models/usercard');

const usercardsController={};

usercardsController.addToUser = (req, res) => {
  Usercard.addToUser({
    cardId: req.body.cardId,
    name: req.body.name,
    class: req.body.class,
    attack: req.body.attack,
    defense: req.body.defense,
    imageUrl: req.body.imageUrl,
  }, req.user.id)
  .then(usercard => {
    res.json(usercard);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
}

usercardsController.update = (req, res) => {
  Usercard.update({
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

usercardsController.delete = (req, res) => {
  Usercard.destroy(req.params.id)
  .then(() => {
    console.log(deleted);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
}

module.exports = usercardsController;