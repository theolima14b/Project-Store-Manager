const productService = require('../services/productService');

const addProduct = async (req, res) => {
  const { name, quantity } = req.body;

  const product = await productService.addProduct(name, quantity);

  if (!product) {
    res.status(400).json({ message: 'Dados inválidos' });
  }

  res.status(200).send('OK');
};

module.exports = {
  addProduct,
}; 