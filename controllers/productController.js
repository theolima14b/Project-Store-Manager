const productService = require('../services/productService');

const productRequest = async (req, res) => {
  const { name, quantity } = req.body;

  const product = await productService.productMethod(name, quantity);

  if (!product) {
    res.status(400).json({ message: 'Dados inválidos' });
  }

  res.status(200).send('OK');
};

module.exports = {
  productRequest,
}; 