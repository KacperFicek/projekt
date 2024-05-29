const bcrypt = require('bcrypt');
const mysql = require('mysql2');

const dbConfig = {
  host: 'localhost',
  user: 'sklep',
  password: '1234',
  database: 'sklep',
  port: 3306
};

const connection = mysql.createConnection(dbConfig);

const username = 'kubakoks3';
const email = 'kuba3@wp.pl';
const password = '123kuba';
const role = 'admin';

bcrypt.hash(password, 10, (err, hash) => {
  if (err) {
    console.error('Error hashing password:', err);
    return;
  }

  const query = 'INSERT INTO Users (username, email, password, role) VALUES (?, ?, ?, ?)';
  connection.query(query, [username, email, hash, role], (err, results) => {
    if (err) {
      console.error('Error inserting user:', err);
      return;
    }

    console.log('Admin user created successfully!');
    connection.end();
  });
});
