const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../models/connection');

const productModel = require('../../models/product');
const productService = require('../../services/product');

const salesModel = require('../../models/sales');
const salesService = require('../../services/sales');

describe('Get all products in the database', () => {
  const products = [
    {
      id: 1,
      name: "Churrasquinho",
      quantity: 10,
    },
    {
      id: 2,
      name: "Feijãoziho",
      quantity: 50,
    },
    {
      id: 3,
      name: "Linguicinha",
      quantity: 50,
    },
    {
      id: 4,
      name: "Farofinha",
      quantity: 100,
    }];

  before(async () => {
    sinon.stub(productModel, 'getAll').resolves(products);
  });

  after(async () => {
    productModel.getAll.restore();
  });

  it('Should return a array of objects with these properties', async () => {
    const response = await productService.getAll();
    response.forEach((obj) =>{
      expect(obj).to.be.a('object');
      expect(obj).to.have.a.property('id');
      expect(obj).to.have.a.property('name');
      expect(obj).to.have.a.property('quantity');
    });
  });
});

describe('Get a product with a valid ID', () => {

  const product = [{ id: 1, name: "Churrasquinho", quantity: 10 }];

  before(async () => {
    sinon.stub(productModel, 'getById').resolves(product);
  });

  after(async () => {
    productModel.getById.restore();
  });


  it('Should return an object with these properties when the ID is equal to 1', async () => {
    const response = await productService.getById(3);
      expect(response[0]).to.be.a('object');
      expect(response[0]).to.have.a.property('id');
      expect(response[0]).to.have.a.property('name');
      expect(response[0]).to.have.a.property('quantity');
      expect(response).to.be.length(1);
  });
});

describe('Create a new sale', () => {
  const id = 1; 
  const array = [
    {
      product_id: 1,
      quantity: 2,
    },
    {
      product_id: 3,
      quantity: 4,
    },
  ];

  const expectedReturn = {
    id: 1,
    itemsSold: [
      {
        product_id: 1,
        quantity: 2,
      },
      {
        product_id: 3,
        quantity: 4,
      },
    ],
  };

  before(async () => {
    sinon.stub(salesModel, 'addSale').resolves(id);
    sinon.stub(salesModel, 'addSale').getCalls(2);
  });

  after(async () => {
    salesModel.addSale.restore();
  });


  it('Should return an object with these properties', async () => {
    const response = await salesService.addSale(array);
      expect(response).to.be.a('object');
      expect(response).to.have.a.property('id');
      expect(response).to.have.a.property('itemsSold');
      expect(response.itemsSold[0]).to.have.a.property('product_id');
      expect(response.itemsSold[0]).to.have.a.property('quantity');
      expect(response.itemsSold).to.be.length(2);
  });
});

describe('Test getAll from sales', () => {

  const sales = [
    {
      saleId: 1,
      date: "2022-02-16T07:05:50.000Z",
      product_id: 1,
      quantity: 10
    },
    {
      saleId: 2,
      date: "2022-02-16T07:06:20.000Z",
      product_id: 1,
      quantity: 10
    },
    {
      saleId: 3,
      date: "2022-02-16T07:08:24.000Z",
      product_id: 1,
      quantity: 10
    },
    {
      saleId: 4,
      date: "2022-02-16T07:08:35.000Z",
      product_id: 1,
      quantity: 10
    },
    {
      saleId: 5,
      date: "2022-02-16T07:08:44.000Z",
      product_id: 1,
      quantity: 10
    },
  ];

  before(async () => {
    sinon.stub(salesModel, 'getAll').resolves(sales);
  });

  after(async () => {
    salesModel.getAll.restore();
  });


  it('Returns a object with these properties', async () => {
   const response = await salesService.getAll();
    response.forEach((obj) =>{
      expect(obj).to.be.a('object');
      expect(obj).to.have.a.property('saleId');
      expect(obj).to.have.a.property('date');
      expect(obj).to.have.a.property('product_id');
      expect(obj).to.have.a.property('quantity');
      expect(response).to.be.length(5);
    });
  });
});

describe('Test getById from sales', () => {

  const sale = [
    {
    date: "2022-02-16T07:06:20.000Z",
    product_id: 1,
    quantity: 5,
    },
    {
    date: "2022-02-16T07:06:20.000Z",
    product_id: 2,
    quantity: 10,
    },
  ]

  before(async () => {
    sinon.stub(salesModel, 'getById').resolves(sale);
  });

  after(async () => {
    salesModel.getById.restore();
  });


  it('Returns a object with these properties', async () => {
   const response = await salesService.getById(2);
    response.forEach((obj) =>{
      expect(obj).to.be.a('object');
      expect(obj).to.have.a.property('date');
      expect(obj).to.have.a.property('product_id');
      expect(obj).to.have.a.property('quantity');
      expect(response).to.be.length(2);
     
    });
  });
});

describe('Test updateSale from sales', () => {
  const array = [
    {
      product_id: 1,
      quantity: 6,
    },
  ];

  before(async () => {
    sinon.stub(salesModel, 'updateSale').getCall(1);
  });

  after(async () => {
    salesModel.updateSale.restore();
  });


  it('Returns a object with these properties', async () => {
   const response = await salesService.updateSale('2', array);
      expect(response).to.be.a('object');
      expect(response).to.have.a.property('saleId');
      expect(response).to.have.a.property('itemUpdated');
      expect(response.itemUpdated[0]).to.have.a.property('product_id');
      expect(response.itemUpdated[0].product_id).to.be.equal(1);
      expect(response.itemUpdated[0]).to.have.a.property('quantity');
      expect(response.itemUpdated[0].quantity).to.be.equal(6);
      expect(response.itemUpdated).to.be.length(1); 
  });
   
});

describe('Test deleteSale from sales', () => {
  const array = [
    { 
      date: "2021-09-09T04:54:29.000Z",
      product_id: 1,
      quantity: 2,
    },
    {
      date: "2021-09-09T04:54:54.000Z",
      product_id: 2,
      quantity: 2,
    },
  ];

  before(async () => {
    sinon.stub(salesModel, 'getById').resolves(array);
    sinon.stub(salesModel, 'deleteSale').getCall(1);
  });

  after(async () => {
    salesModel.getById.restore()
    salesModel.deleteSale.restore();
  });


  it('Returns a object with these properties', async () => {
   const response = await salesService.deleteSale(2);
      expect(response).to.be.a('array');
      expect(response).to.be.length(2); 
      response.forEach((obj) =>{
        expect(obj).to.be.a('object');
        expect(obj).to.have.a.property('date');
        expect(obj).to.have.a.property('product_id');
        expect(obj).to.have.a.property('quantity');       
      });
  });
   
});