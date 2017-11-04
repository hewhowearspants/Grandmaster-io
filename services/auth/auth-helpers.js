const bcrypt = require("bcryptjs");
const User = require("../../models/user");

const comparePass = (userPassword, databasePassword) => {
  return bcrypt.compareSync(userPassword, databasePassword);
};

const loginRedirect = (req, res, next) => {
  if (req.user) return res.redirect("/user");
  return next();
};

const loginRequired = (req, res, next) => {
  if (!req.user) return res.redirect("/auth/login");
  return next();
};

module.exports = {
  comparePass,
  loginRedirect,
  loginRequired
};
