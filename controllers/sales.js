const salesService = require('../services/sales');

const getAll = async (_req, res) => {
  const allSales = await salesService.getAll();

  return res.status(200).json(allSales);
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const saleById = await salesService.getById(id);

    return res.status(200).json(saleById);
  } catch (err) {
    return res.status(404).json({ message: 'Sale not found' });
  }
};

const addSale = async (req, res) => {
  const sale = req.body;
  const addedSale = await salesService.addSale(sale);

  return res.status(201).json(addedSale);
};

const updateSale = async (req, res) => {
  const { id } = req.params;
  const sale = req.body;

  const updatedSale = await salesService.updateSale(id, sale);

  return res.status(200).json(updatedSale);
};

const deleteSale = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedSale = await salesService.getById(id);

    await salesService.deleteSale(id);

    return res.status(200).json(deletedSale);
  } catch (err) {
    return res.status(404).json({ message: 'Sale not found' });
  }
};

module.exports = { 
  getAll,
  getById,
  addSale,
  updateSale,
  deleteSale,
};
