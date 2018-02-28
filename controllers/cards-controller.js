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

cardsController.indexCounters = async (req, res) => {
  try {
    const counters = await Card.findAllCounters();
    return res.json(counters);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}

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
    const num = req.params.num / 2;
    const cards = await Card.findPremiumOne(num);
    return res.json(cards);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

cardsController.findCounter = async (req, res) => {
  try {
    const counter = await Card.findCounter();
    return res.json(counter);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}

module.exports = cardsController;
