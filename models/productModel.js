const connection = require('./connection');

// const getAll = async () => {
//     const query = 'SELECT * FROM StoreManager.products';
//     const [products] = await connection.execute(query);
//     return products;
// };

// const getProductById = async (id) => {
//   const query = 'SELECT * FROM StoreManager.products WHERE id = ?';
//   const [products] = await connection.execute(query, [id]);
//   return products[0];
// };

const addProduct = async (name, quantity) => {
  const [product] = await connection.execute(
    'INSERT INTO StoreManager.products (`name`, quantity) VALUES (?, ?)',
    [name, quantity],
  );

  return product;
};

// const updateProduct = async ({ id, name, quantity }) => {
//   const query = 'UPDATE StoreManager.products SET name = ?, quantity = ? WHERE id = ?';
//   const [products] = await connection.execute(query, [id, name, quantity]);
//   return {
//     id: products.updateId, 
//     name,
//     quantity,
//   };
// };

// const deleteProduct = async (id) => {
//   const query = 'DELE FROM StoreManager.products WHERE id = ?';
//   await connection.execute(query, [id]);
// };

module.exports = {
  // getAll,
  // getProductById,
  addProduct,
  // updateProduct,
  // deleteProduct,
};