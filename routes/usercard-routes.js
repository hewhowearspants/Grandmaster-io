const express = require('express');
const usercardRoutes = express.Router();
const usercardsController = require('../controllers/usercards-controller');
const authHelpers = require('../services/auth/auth-helpers');
//find all class cards of specific user
usercardRoutes.get('/', authHelpers.loginRequired, usercardsController.findUserCards);
// get all counter cards of specific user
usercardRoutes.get('/counter', authHelpers.loginRequired, usercardsController.findUserCounters);
// get ALL cards of specific user
usercardRoutes.get('/all', authHelpers.loginRequired, usercardsController.findAllUserCards);
//add new card to user
usercardRoutes.post('/', authHelpers.loginRequired, usercardsController.addToUser);
// add new counter to user
usercardRoutes.post('/counter', authHelpers.loginRequired, usercardsController.addCounter);
//customize name of user's card
usercardRoutes.put('/:id', authHelpers.loginRequired, usercardsController.update);
//delete user's cards
usercardRoutes.delete('/:id', authHelpers.loginRequired, usercardsController.delete);
//delete user's counters
usercardRoutes.delete('/counter/:id', authHelpers.loginRequired, usercardsController.deleteCounter);
//find five random cards from user's cards, for battle preparation
usercardRoutes.get('/start', authHelpers.loginRequired, usercardsController.findFiveUserCards);



module.exports = usercardRoutes;
