const mysql = require('mysql2');

const dbConfig = {
  host: 'localhost',
  user: 'sklep',
  password: '1234',
  database: 'sklep',
  port: 3306
};

const connection = mysql.createConnection(dbConfig);

module.exports = connection;
