const express = require('express');
const cardRoutes = express.Router();
const authHelpers = require('../services/auth/auth-helpers');

const cardsController = require('../controllers/cards-controller');

cardRoutes.get('/', cardsController.index);
cardRoutes.get('/new',authHelpers.loginRequired,cardsController.findOne);

module.exports = cardRoutes;