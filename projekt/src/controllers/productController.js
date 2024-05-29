const productModel = require('../models/productModel');

const getAllProducts = (req, res) => {
  productModel.getAllProducts((err, results) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Wystąpił błąd serwera.' });
    }
    res.json({ success: true, products: results });
  });
};

const createProduct = (req, res) => {
  const { name, description, price, categoryId } = req.body;

  productModel.createProduct(name, description, price, categoryId, (err, results) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Wystąpił błąd serwera.' });
    }
    res.json({ success: true, message: 'Produkt utworzony!' });
  });
};

module.exports = {
  getAllProducts,
  createProduct
};
