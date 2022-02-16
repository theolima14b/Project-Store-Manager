const bodyParser = require('body-parser');
const express = require('express');
const Products = require('./routes/products');
const Sales = require('./routes/sales');

const app = express();
app.use(bodyParser.json());
require('dotenv').config();

app.use('/products', Products);
app.use('/sales', Sales);
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});
app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
