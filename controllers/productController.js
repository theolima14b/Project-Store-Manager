const productService = require('../services/productService');

// const getAll = async (_req, res) => {
//   const allProducts = await productService.getAll();

//   if (!allProducts) return res.status(500).json({ message: 'Falha na requisição' });

//   return res.status(200).json(allProducts);
// };

const addProduct = async (req, res) => {
  const { name, quantity } = req.body;

  const product = await productService.addProduct(name, quantity);

  return res.status(201).send(product);
};

module.exports = {
  addProduct,
  // getAll,
}; 