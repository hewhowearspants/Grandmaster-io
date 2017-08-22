const express=require('express');
const usercardRoutes=express.Router();
const usercardsController=require('../controllers/usercards-controller');
const authHelpers=require('../services/auth/auth-helpers');

usercardRoutes.post('/new',authHelpers.loginRequired,usercardsController.addToUser);

module.exports=usercardRoutes;