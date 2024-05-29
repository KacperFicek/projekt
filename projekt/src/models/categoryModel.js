const connection = require('../config/db');

const getAllCategories = (callback) => {
  const query = 'SELECT * FROM Categories';
  connection.query(query, callback);
};

const createCategory = (name, callback) => {
  const query = 'INSERT INTO Categories (name) VALUES (?)';
  connection.query(query, [name], callback);
};

module.exports = {
  getAllCategories,
  createCategory
};
