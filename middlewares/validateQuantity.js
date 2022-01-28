const validateQuantity = (req, res, next) => {
  const { quantity } = req.body;
  if (!quantity) {
    return res.status(409).json({ message: '"quantity" is required' });
  }

  if (typeof quantity !== 'number' || quantity <= 0) {
    return res
      .status(422)
      .json({
        message: '"quantity" must be a number larger than or equal to 1',
      });
  }

  next();
};

module.exports = validateQuantity;