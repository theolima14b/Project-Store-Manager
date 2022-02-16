const express = require('express');
const salesController = require('../controllers/sales');
const saleMiddleware = require('../middlewares/validateSale');
const areEnoughQuantities = require('../middlewares/validateEnoughQuantity');

const salesRouter = express.Router();

salesRouter.post('/', 
  saleMiddleware.validateSale, 
  areEnoughQuantities.quantityValidator,
  salesController.addSale);

salesRouter.get('/', salesController.getAll);

salesRouter.get('/:id', salesController.getById);

salesRouter.put('/:id', 
  saleMiddleware.validateSale, 
  salesController.updateSale);

salesRouter.delete('/:id', salesController.deleteSale);

module.exports = salesRouter;
