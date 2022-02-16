const mysql = require("mysql");

const db = mysql.createPool({
  host: "localhost", // "localhost" by default
  user: "root", // "root" by default
  password: "1pV7DJcm2W",
  database: "merchant_service",
});

module.exports = db;