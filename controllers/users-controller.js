const bcrypt = require('bcryptjs');
const User = require('../models/user.js');

const usersController = {};

//create new user
usersController.create = async (req, res) => {
  try {
    const salt = await bcrypt.genSaltSync();
    const hash = await bcrypt.hashSync(req.body.password, salt);
    const user = await User.create({
      username: req.body.username,
      password_digest: hash,
      displayName: req.body.displayName,
      email: req.body.email
    });
    req.login(user, err => {
      if (err) return next(err);
      res.json({
        message: "ok",
        user: user,
        auth: true
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

usersController.index = async (req, res) => {
  const user = await res.json({
    user: req.user,
    data: "Put a user profile on this route"
  });
};
//edit user's info
usersController.update = async (req, res) => {
  try {
    console.log(req.params);
    const user = await User.update(
      req.body.display_name,
      req.body.email,
      req.body.wins,
      req.body.currency,
      req.params.id
    );
    return res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
//delete user
usersController.delete = async (req, res) => {
  try {
    const user = await User.destroy(req.params.id);
    return res.json({
      message: "ok",
      user: user
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err });
  }
};
//show leaderboard page
usersController.showLeaderboard = (req, res) => {
  User.showLeaderboard()
    .then(users => {
      res.json({
        message: "ok",
        data: users
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
};
//update currency and wins after player wins the battle
usersController.updateCurrencyNWins = async (req, res) => {
  try {
    const user = await User.updateCurrencyNWins({
      currency: req.body.currency,
      wins: req.body.wins,
      username: req.body.username
    });
    return res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

module.exports = usersController;
