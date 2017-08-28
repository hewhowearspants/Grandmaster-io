const db = require('../db/config');
const User = {};
//find users' cards
User.findByUserName = username => {
    return db.oneOrNone(`
    SELECT * FROM users
    WHERE username = $1
    `,[username]);
};
//create new users 
User.create = user => {
    return db.one(`
    INSERT INTO users
    (username, password_digest, display_name, email, wins, currency)
    VALUES ($1, $2, $3, $4, 0, 100)
    RETURNING *
    `,[user.username, user.password_digest, user.displayName, user.email]);
};
//edit users info
User.update = (displayName, email, id)=>{
  return db.one(`
  UPDATE users SET
  display_name = $1,
  email = $2
  WHERE id = $3
  RETURNING *
  `,[displayName, email, id]);
};
//leader board page, show top ten users according to their wins
User.showLeaderboard = () => {
    return db.query(`
    SELECT * FROM users
    ORDER BY wins DESC
    LIMIT 10
    `);
};
//delete usrs
User.destroy = (id, user_id) => {
return db.none(`
  DELETE FROM users_cards where user_id = $1;
  DELETE FROM users WHERE id = $1
  `,[id]);
};
//update currency and wins after winning
User.updateCurrencyNWins = (user) => {
    return db.one(`
    UPDATE users SET
    wins = $1,
    currency = $2
    WHERE username = $3
    RETURNING *
    `, [user.wins, user.currency, user.username])
}

module.exports = User;