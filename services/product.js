const productModel = require('../models/product');

const getAll = async () => {
  const allProducts = await productModel.getAll();

  return allProducts;
};

const getById = async (id) => {
  const product = await productModel.getById(id);
  return product;
};

const addProduct = async (name, quantity) => {
  const allProducts = await productModel.getAll();

  const productExists = allProducts.some((product) => product.name === name);

  if (productExists) throw new Error();

  const [product] = await productModel.addProduct(name, quantity);

  const newProduct = {
    id: product.insertId,
    name,
    quantity,
  };

  return newProduct;
};

const updateProduct = async (id, name, quantity) => {
  const allProducts = await productModel.getAll();
  const findProduct = allProducts.find((product) => product.id === Number(id));

  if (!findProduct) throw new Error();

  const updatedProduct = await productModel.updateProduct(id, name, quantity);

  return updatedProduct;
};

const deleteProduct = async (id) => {
  const allProducts = await productModel.getAll();
  const findProduct = allProducts.find((product) => product.id === Number(id));

  if (!findProduct) throw new Error();

  await productModel.deleteProduct(id);
  return findProduct;
};

module.exports = { 
  getAll,
  getById,
  addProduct,
  updateProduct,
  deleteProduct,
};
