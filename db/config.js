const options = {
  query: e => {
    console.log(e.query);
  }
};

const pgp = require("pg-promise")(options);

function setDatabase() {
  if (process.env.NODE_ENV === "development" || !process.env.NODE_ENV) {
    return pgp({
      database: "dream_team_dev",
      port: 5432,
      host: "localhost"
    });
  } else {
    return pgp(process.env.DATABASE_URL);
  }
}

const db = setDatabase();

module.exports = db;
