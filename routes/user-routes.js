const express=require('express');
const userRoutes=express.Router();
const usersController=require('../controllers/users-controller');
const cardsController=require('../controllers/cards-controller');
const authHelpers=require('../services/auth/auth-helpers');

userRoutes.get('/',authHelpers.loginRequired,usersController.index);
userRoutes.get('/new',authHelpers.loginRequired,cardsController.findTen);
userRoutes.post('/new',authHelpers.loginRequired,cardsController.addToUser);

module.exports=userRoutes;