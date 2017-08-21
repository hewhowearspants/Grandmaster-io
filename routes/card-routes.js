const express = require('express');
const cardRoutes = express.Router();
const authHelpers = require('../services/auth/auth-helpers');

const cardsController = require('../controllers/cards-controller');

cardRoutes.get('/', cardsController.index);

module.exports = cardRoutes;