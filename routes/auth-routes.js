const express = require('express');
const authRouter = express.Router();
const passport = require('../services/auth/local');
const authHelpers = require('../services/auth/auth-helpers');
const usersController = require('../controllers/users-controller');
//register route
authRouter.post('/register',usersController.create);
//login route
authRouter.post('/login',passport.authenticate('local',{
    successRedirect: '/auth/success',
    failureRedirect: '/auth/failure',
    failureFlash: true,
    })
);
//logout route
authRouter.get('/logout', (req, res) => {
    req.logout();
    res.json({
        message: 'logged out',
        auth: false,
    })
});
//login success route
authRouter.get('/success', (req, res) => {
    res.json({
        auth: true,
        message: 'ok',
        user: req.user,
    });
});
//login failed route: non-matching username/password
authRouter.get('/failure', (req, res) => {
    res.json({
        auth: false,
        message: 'Login failed',
        user: null,
    });
});

module.exports = authRouter;