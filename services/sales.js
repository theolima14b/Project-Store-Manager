const salesModel = require('../models/sales');

const getAll = async () => {
  const [allSales] = await salesModel.getAll();

  return allSales;
};

const getById = async (id) => {
  const [saleById] = await salesModel.getById(id);

  if (!saleById || saleById.length === 0) throw new Error();

  return saleById;
};

const addSale = async (sale) => {
  const newSale = await salesModel.addSale(sale);

  const response = {
    id: newSale.insertId,
    itemsSold: sale,
  };

  return response;
};

const updateSale = async (id, sale) => {
  await salesModel.updateSale(id, sale);

  const updatedSale = {
    saleId: +id,
    itemUpdated: sale,
  };

  return updatedSale;
};

const deleteSale = async (id) => {
  await salesModel.deleteSale(id);
};

module.exports = { 
  getAll,
  getById,
  addSale,
  updateSale,
  deleteSale,
 };