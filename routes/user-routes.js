const express = require('express');
const userRoutes = express.Router();
const usersController = require('../controllers/users-controller');
const cardsController = require('../controllers/cards-controller');
const authHelpers = require('../services/auth/auth-helpers');
//show users cards
userRoutes.get('/', authHelpers.loginRequired, usersController.index);
//get random ten new cards for new users
userRoutes.get('/new', authHelpers.loginRequired, cardsController.findTen);
//show leaderboard
userRoutes.get('/leaderboard', authHelpers.loginRequired, usersController.showLeaderboard);
//update currency and wins after winning battle
userRoutes.put('/win', authHelpers.loginRequired, usersController.updateCurrencyNWins);
//update users info
userRoutes.put('/:id', authHelpers.loginRequired, usersController.update);
//delete user
userRoutes.delete('/:id', authHelpers.loginRequired, usersController.delete);

module.exports = userRoutes;