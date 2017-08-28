const bcrypt = require('bcryptjs');
const User = require('../models/user.js');

const usersController = {};

usersController.create = (req,res) => {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(req.body.password,salt);
    User.create({
        username: req.body.username,
        password_digest: hash,
        displayName: req.body.displayName,
        email: req.body.email,
    })
    .then(user => {
        req.login(user,(err) => {
            if(err)return next(err);
            res.json({
                message: 'ok',
                user: user,
                auth: true,
            })
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
}

usersController.index = (req,res) => {
    res.json({
        user: req.user,
        data: 'Put a user profile on this route'
    });
}

usersController.update = (req, res) => {
    console.log(req.params);
    User.update(req.body.displayName, req.body.email, req.params.id)
    .then(user => {
      res.json(user);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  }

usersController.delete = (req, res) => {
  User.destroy(req.params.id)
  .then(user => {
    res.json({
      message: 'ok',
      user: user,
    })
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ err });
  })
}

usersController.showLeaderboard = (req, res) => {
    User.showLeaderboard()
    .then(users => {
        res.json({
            message: 'ok',
            data: users
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
}

usersController.updateCurrencyNWins = (req,res) => {
    User.updateCurrencyNWins({
        currency: req.body.currency,
        wins: req.body.wins,
    }, req.user.id)
    .then(user => {
        res.json(user);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
}

module.exports=usersController;
