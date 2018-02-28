const express = require('express');
const cardRoutes = express.Router();
const authHelpers = require('../services/auth/auth-helpers');

const cardsController = require('../controllers/cards-controller');
//get all cards route
cardRoutes.get('/', cardsController.index);
cardRoutes.get('/counter', cardsController.indexCounters)
//get one new card route
cardRoutes.get('/new', authHelpers.loginRequired, cardsController.findOne);
cardRoutes.get('/new/:num', authHelpers.loginRequired, cardsController.findPremiumOne);
cardRoutes.get('/counter/new', authHelpers.loginRequired, cardsController.findCounter);

module.exports = cardRoutes;