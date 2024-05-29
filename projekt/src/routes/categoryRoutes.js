const express = require('express');
const categoryController = require('../controllers/categoryController');
const { withAdminAuth } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', categoryController.getAllCategories);
router.post('/', withAdminAuth, categoryController.createCategory);

module.exports = router;
