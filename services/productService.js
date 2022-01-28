const productModel = require('../models/productModel');

const addProduct = async (name, quantity) => {
  await productModel.addProduct(name, quantity);

  return true;
};

module.exports = {
  addProduct,
};