const productModel = require('../models/product');

const checkProduct = async (sale) => {
  const allProducts = await productModel.getAll();
  const findProduct = allProducts.find((product) => product.id === sale.product_id);

  console.log(findProduct);

  return findProduct;
};

const quantityValidator = async (req, res, next) => {
  const sales = req.body;
  const isValid = sales.map(checkProduct);
  await Promise.all(isValid).then((result) => {
    if (!result.every((element) => element)) {
        return res.status(422).json(
            { message: 'Such amount is not permitted to sell' },
        );
    }
    next();
});   
};

module.exports = {
  quantityValidator,
};