const Usercard = require('../models/usercard');

const usercardsController={};

usercardsController.findUserCards = (req, res) => {
  Usercard.findUserCards(req.user.id)
  .then(usercards=>{
    res.json(usercards);
  })
  .catch(err=>{
    console.log(err);
    res.status(500).json(err);
  });
};

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
};

module.exports = usercardsController;