const productModel = require('../models/productModel');

const getAll = async () => {
  const allProducts = await productModel.getAll();
  return allProducts;
};

const addProduct = async (name, quantity) => {
  const newProduct = await productModel.addProduct(name, quantity);

  return newProduct;
};

module.exports = {
  addProduct,
  getAll,
};