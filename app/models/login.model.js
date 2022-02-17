const db = require("../../config/dbConnection");

const signin = (params, callback) => {
  const selectQuery = `SELECT id, name, phone_number, address FROM merchant WHERE phone_number = ? AND password = ?;`;
  db.query(selectQuery, params, callback);
};

module.exports = {
  signin,
};
