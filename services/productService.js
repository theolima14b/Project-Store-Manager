const productModel = require('../models/productModel');

const addProduct = async (name, quantity) => {
  const newProduct = await productModel.addProduct(name, quantity);

  return newProduct;
};

module.exports = {
  addProduct,
};