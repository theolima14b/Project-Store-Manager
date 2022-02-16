const express = require('express');
const productController = require('../controllers/product');
const nameMiddleware = require('../middlewares/validateName');
const quantityMiddleware = require('../middlewares/validateQuantity');

const productsRouter = express.Router();

productsRouter.post('/', 
  nameMiddleware.validateName,
  quantityMiddleware.validateQuantity, 
  productController.addProduct);

productsRouter.get('/', productController.getAll);

productsRouter.get('/:id', productController.getById);

productsRouter.put('/:id', 
  nameMiddleware.validateName, 
  quantityMiddleware.validateQuantity, 
  productController.updateProduct);

productsRouter.delete('/:id', productController.deleteProduct);

module.exports = productsRouter;
