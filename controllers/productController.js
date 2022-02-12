const productService = require('../services/productService');

const getAll = async (_req, res) => {
  const allProducts = await productService.getAll();

  if (!allProducts) return res.status(500).json({ message: 'Falha na requisição' });

  return res.status(200).json(allProducts);
};

const addProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const product = await productService.addProduct(name, quantity);

  return res.status(201).json({
    id: product.insertId, 
    name, 
    quantity,
  });
};

const getProductById = async (req, res) => {
  const { productId } = req.params;
  const allProducts = await productService.getAll();

  const findProduct = allProducts.find((product) => product.id === Number(productId));

  if (!findProduct) {
    return res.status(404).json({ message: 'Product not found' });
  }

  return res.status(200).json(findProduct);
};

module.exports = {
  getAll,
  addProduct,
  getProductById,
}; 