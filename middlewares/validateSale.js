const validateProducts = (sale) => sale
  .every(({ product_id: productId }) => productId === undefined);

const validateQuantityOne = (sale) => sale
  .every(({ quantity }) => quantity === undefined && quantity !== 0);

const validateQuantityTwo = (sale) => sale
  .every(({ quantity }) => typeof quantity !== 'number' || quantity < 1);

const validateSale = (req, res, next) => {
  const sale = req.body;

  if (validateProducts(sale)) {
    return res.status(400).json({ message: '"product_id" is required' });
  }

  if (validateQuantityOne(sale)) {
    return res.status(400).json({ message: '"quantity" is required' });
  }

  if (validateQuantityTwo(sale)) {
    return res
    .status(422)
    .json({ message: '"quantity" must be a number larger than or equal to 1' });
  }

  next();
};

module.exports = { 
  validateSale,
 };
