const productModel = require('../models/productModel');

const getAll = async () => {
  const allProducts = await productModel.getAll();
  return allProducts;
};

const addProduct = async (name, quantity) => {
  const newProduct = await productModel.addProduct(name, quantity);

  return newProduct;
};

const getById = async (id) => {
  const productById = await productModel.getProductById(id);

  return productById;
};

module.exports = {
  getAll,
  addProduct,
  getById,
};