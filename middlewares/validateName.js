const { getAll } = require('../models/productModel');

const validateName = (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: '"name" is required' });
  }

  if (name.length <= 5) {
    return res
      .status(422)
      .json({ message: '"name" length must be at least 5 characters long' });
  }

  next();
};

const productAlreadyExists = async (req, res, next) => {
  const { name } = req.body;
  const allProducts = await getAll();

  const checkProduct = allProducts.some((product) => (product.name === name)); // Idéia do Gustavo Sant'Anna, ja retorna um true ou false na checagem. //

  if (checkProduct === true) {
    return res.status(409).json({ message: 'Product already exists' });
  }

  next();
};

module.exports = {
  validateName, 
  productAlreadyExists,
};