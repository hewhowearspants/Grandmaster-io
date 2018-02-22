const Card = require('../models/card');

const cardsController = {};

//find all cards, card collection page
cardsController.index = async (req, res) => {
  try {
    const cards = await Card.findAll();
    return res.json(cards);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

//find ten cards, new user registration
cardsController.findTen = async (req, res) => {
  try {
    const cards = await Card.findTen();
    return res.json(cards);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

//find new one card, get new card page
cardsController.findOne = async (req, res) => {
  try {
    const cards = await Card.findOne();
    return res.json(cards);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

cardsController.findPremiumOne = async (req, res) => {
  try {
    const cards = await Card.findPremiumOne(req.params.num);
    return res.json(cards);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

module.exports = cardsController;
