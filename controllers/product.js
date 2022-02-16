const productService = require('../services/product');

const getAll = async (_req, res) => {
  const allProducts = await productService.getAll();

  return res.status(200).json(allProducts);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const allProducts = await productService.getAll();
  const foundProduct = allProducts.find((product) => product.id === Number(id));
    
  if (!foundProduct) {
   return res.status(404).json({ message: 'Product not found' });
  }

  return res.status(200).json(foundProduct);
};

const addProduct = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const addedProduct = await productService.addProduct(name, quantity);
    
    return res.status(201).json(addedProduct);
  } catch (err) {
    return res.status(409).json({ message: 'Product already exists' });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;

    const updatedProduct = await productService.updateProduct(id, name, quantity);

    return res.status(200).json(updatedProduct);
  } catch (err) {
    return res.status(404).json({ message: 'Product not found' });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await productService.deleteProduct(id);
    
    return res.status(200).json(deletedProduct);
  } catch (err) {
    return res.status(404).json({ message: 'Product not found' });
  }
};

module.exports = { 
  getAll,
  getById,
  addProduct,
  updateProduct,
  deleteProduct,
 };
