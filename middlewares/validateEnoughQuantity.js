const productModel = require('../models/product');

const INVALID_QUANTITY = 'Such amount is not permitted to sell';

const saleQuantyValidator = async (req, res, next) => {
  const { body } = req;

  const isValid = body.map(async (soldProduct) => {
    const product = await productModel.getById(soldProduct.product_id);
    if (product.quantity < soldProduct.quantity) return false;
    return true;
  });

  await Promise.all(isValid).then((validation) => {
    if (!validation.every((element) => element)) {
      return res.status(422).json({ message: INVALID_QUANTITY });
    }
    
    next();
  });
};

module.exports = { 
  saleQuantyValidator,
};