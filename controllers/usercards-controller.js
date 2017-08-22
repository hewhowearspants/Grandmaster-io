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
    console.log('deleted');
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
}

usercardsController.findFiveUserCards = (req, res) => {
  Usercard.findFiveUserCards(req.user.id)
  .then(userCard => {
    return Usercard.findFiveUserCards(1)
           .then(opponentCard => {
             return {
               user:userCard,
               oppo:opponentCard
             }
           })
           .catch(err => {
             console.log(err);
           })
  })
  .then(data => {
    console.log(data);
  })
  .catch(err => {
    console.log(err);
  })
}

module.exports = usercardsController;