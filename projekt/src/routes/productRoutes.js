const express = require('express');
const productController = require('../controllers/productController');
const { withAdminAuth } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', productController.getAllProducts);
router.post('/', withAdminAuth, productController.createProduct);

module.exports = router;
