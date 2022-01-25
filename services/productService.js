const productModel = require('../models/productModel');

const productMethod = async (name, quantity) => {
  await productModel.addProduct(name, quantity);

  return true;
};

module.exports = {
  productMethod,
};