require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const rescue = require('express-rescue');
const validateName = require('./middlewares/validateName');
const validateQuantity = require('./middlewares/validateQuantity');

const productController = require('./controllers/productController');

const app = express();

app.use(bodyParser.json());

app.post('/products', validateName, validateQuantity, rescue(productController.addProduct));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
