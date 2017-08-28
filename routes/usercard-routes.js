const express = require('express');
const usercardRoutes = express.Router();
const usercardsController = require('../controllers/usercards-controller');
const authHelpers = require('../services/auth/auth-helpers');
//find all cards of specific user
usercardRoutes.get('/', authHelpers.loginRequired, usercardsController.findUserCards);
//add new card to user
usercardRoutes.post('/new', authHelpers.loginRequired, usercardsController.addToUser);
//customize name of user's card
usercardRoutes.put('/:id', authHelpers.loginRequired, usercardsController.update);
//delete user's cards
usercardRoutes.delete('/:id', authHelpers.loginRequired, usercardsController.delete);
//find five random cards from user's cards, for battle preparation
usercardRoutes.get('/start', authHelpers.loginRequired, usercardsController.findFiveUserCards);

module.exports = usercardRoutes;
