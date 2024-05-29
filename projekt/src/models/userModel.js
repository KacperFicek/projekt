const connection = require('../config/db');

const findUserByUsernameOrEmail = (usernameOrEmail, callback) => {
  const query = 'SELECT * FROM Users WHERE username = ? OR email = ?';
  connection.query(query, [usernameOrEmail, usernameOrEmail], callback);
};

const createUser = (username, email, hashedPassword, role, callback) => {
  const insertQuery = 'INSERT INTO Users (username, email, password, role) VALUES (?, ?, ?, ?)';
  connection.query(insertQuery, [username, email, hashedPassword, role || 'user'], callback);
};

module.exports = {
  findUserByUsernameOrEmail,
  createUser
};
