const express = require('express');
const userRoutes = express.Router();
const usersController = require('../controllers/users-controller');
const cardsController = require('../controllers/cards-controller');
const authHelpers = require('../services/auth/auth-helpers');

userRoutes.get('/', authHelpers.loginRequired, usersController.index);
userRoutes.get('/new', authHelpers.loginRequired, cardsController.findTen);
userRoutes.get('/leaderboard', authHelpers.loginRequired, usersController.showLeaderboard);

userRoutes.put('/:id', authHelpers.loginRequired, usersController.update);
userRoutes.delete('/:id', authHelpers.loginRequired, usersController.delete);

userRoutes.put('/win/:id', authHelpers.loginRequired, usersController.updateCurrencyNWins);


module.exports = userRoutes;