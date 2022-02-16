const { connection } = require('./connection');

const getAll = async () => {
  const [products] = await connection.execute(
    'SELECT * from StoreManager.products',
  );

  return products;
};

const getById = async (id) => {
  const [product] = await connection.execute(
    'SELECT * from StoreManager.products WHERE id = ?',
    [id],
  );
  
  return product[0];
};

const addProduct = async (name, quantity) => connection.execute(
  'INSERT INTO StoreManager.products (name, quantity) VALUES (?, ?)',
  [name, quantity],
);

const updateProduct = async (id, name, quantity) => {
  await connection.execute(
    'UPDATE StoreManager.products SET name= ?, quantity= ? WHERE id= ?',
    [name, quantity, id],
  );

  return { id, name, quantity };
};

const deleteProduct = (id, name, quantity) => {
  connection.execute('DELETE FROM StoreManager.products WHERE id= ?', [
    id,
  ]);

  return { id, name, quantity };
};  

module.exports = { 
  getAll,
  getById,
  addProduct,
  updateProduct,
  deleteProduct,
 };
