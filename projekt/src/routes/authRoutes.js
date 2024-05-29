const express = require('express');
const authController = require('../controllers/authController');
const { withAuth, withAdminAuth } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/login', authController.login);
router.post('/register', authController.register);
router.get('/logout', authController.logout);
router.get('/admin', withAdminAuth, (req, res) => {
  res.json({ message: 'Witamy w panelu admina!' });
});
router.get('/dashboard', withAuth, (req, res) => {
  res.json({ message: 'Witamy w panelu użytkownika!' });
});

module.exports = router;
