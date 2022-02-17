const db = require("../../config/dbConnection");

const create = (params, callback) => {
  const insertQuery = `INSERT INTO merchant (name, phone_number, password, address) VALUES (?, ?, ?, ?);`;
  db.query(insertQuery, params, callback);
};

const update = (params, callback) => {
  const updateQuery = `UPDATE merchant SET name = ?, phone_number = ?, address = ?, updated_at = CURRENT_TIMESTAMP() WHERE id = ?;`;
  db.query(updateQuery, params, callback);
};

const updatePassword = (params, callback) => {
  const updateQuery = `UPDATE merchant SET password = ?, updated_at = CURRENT_TIMESTAMP() WHERE id = ?;`;
  db.query(updateQuery, params, callback);
};

const getPassword = (params, callback) => {
  const selectQuery = `SELECT password FROM merchant WHERE id = ?;`;
  db.query(selectQuery, params, callback);
};

const softDelete = (params, callback) => {
  const deleteQuery = `UPDATE merchant SET updated_at = CURRENT_TIMESTAMP(), is_deleted = TRUE WHERE id = ?;`;
  db.query(deleteQuery, params, callback);
};

const merchantDelete = (params, callback) => {
  const deleteQuery = `DELETE FROM merchant WHERE id = ?;`;
  db.query(deleteQuery, params, callback);
};

const deleteProductByMerchant = (params, callbakck) => {
  const deleteQuery = `DELETE FROM product WHERE merchant_id = ?;`;
  db.query(deleteQuery, params, callbakck);
};

module.exports = {
  create,
  update,
  updatePassword,
  getPassword,
  softDelete,
  merchantDelete,
  deleteProductByMerchant,
};
