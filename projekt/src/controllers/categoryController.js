const categoryModel = require('../models/categoryModel');

const getAllCategories = (req, res) => {
  categoryModel.getAllCategories((err, results) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Wystąpił błąd serwera.' });
    }
    res.json({ success: true, categories: results });
  });
};

const createCategory = (req, res) => {
  const { name } = req.body;

  categoryModel.createCategory(name, (err, results) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Wystąpił błąd serwera.' });
    }
    res.json({ success: true, message: 'Kategoria utworzona!' });
  });
};

module.exports = {
  getAllCategories,
  createCategory
};
