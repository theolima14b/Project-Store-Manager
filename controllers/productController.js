const productService = require('../services/productService');

const addProduct = async (req, res) => {
  const { name, quantity } = req.body;

  const product = await productService.addProduct(name, quantity);

  return res.status(200).send(product);
};

module.exports = {
  addProduct,
}; 