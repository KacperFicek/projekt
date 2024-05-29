const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');

const login = (req, res) => {
  const { usernameOrEmail, password } = req.body;

  userModel.findUserByUsernameOrEmail(usernameOrEmail, (err, results) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Wystąpił błąd serwera.' });
    }

    if (results.length > 0) {
      const user = results[0];
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          return res.status(500).json({ success: false, message: 'Wystąpił błąd serwera.' });
        }

        if (isMatch) {
          req.session.user = user;
          res.json({ success: true, message: 'Logowanie udane!', role: user.role });
        } else {
          res.json({ success: false, message: 'Nieprawidłowe dane logowania.' });
        }
      });
    } else {
      res.json({ success: false, message: 'Nieprawidłowe dane logowania.' });
    }
  });
};

const register = (req, res) => {
  const { username, email, password, role } = req.body;

  userModel.findUserByUsernameOrEmail(username, (err, results) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Wystąpił błąd serwera.' });
    }

    if (results.length > 0) {
      return res.json({ success: false, message: 'Użytkownik o podanej nazwie użytkownika lub adresie e-mail już istnieje.' });
    } else {
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          return res.status(500).json({ success: false, message: 'Wystąpił błąd serwera.' });
        }

        userModel.createUser(username, email, hash, role, (err, results) => {
          if (err) {
            return res.status(500).json({ success: false, message: 'Wystąpił błąd serwera.' });
          }
          res.json({ success: true, message: 'Rejestracja udana!' });
        });
      });
    }
  });
};

const logout = (req, res) => {
  if (req.session.user && req.cookies.user_sid) {
    res.clearCookie('user_sid');
    req.session.destroy(err => {
      if (err) {
        return res.status(500).json({ success: false, message: 'Wystąpił błąd podczas wylogowywania.' });
      } else {
        res.json({ success: true, message: 'Wylogowanie udane!' });
      }
    });
  } else {
    res.json({ success: false, message: 'Brak aktywnej sesji.' });
  }
};

module.exports = {
  login,
  register,
  logout
};
