const connection = require('../config/db');

const getAllProducts = (callback) => {
  const query = 'SELECT * FROM Products';
  connection.query(query, callback);
};

const createProduct = (name, description, price, categoryId, callback) => {
  const query = 'INSERT INTO Products (name, description, price, category_id) VALUES (?, ?, ?, ?)';
  connection.query(query, [name, description, price, categoryId], callback);
};

module.exports = {
  getAllProducts,
  createProduct
};
