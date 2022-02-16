const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../models/connection');
const productModel = require('../../models/product');
const salesModel = require('../../models/model');

describe('Insert a new product on the database', () => {
  const product = { name: 'Churrasquinho', quantity: 50 };

  before(async () => {
    const execute = [{ insertId: 1 }]; 
    sinon.stub(connection, 'execute').resolves(execute);
  });

  after(async () => {
    connection.execute.restore();
  });

  describe('When the request is sucessfull', () => {

    it('Should return a object', async () => {
      const response = await productModel.createProduct(product.name, product.quantity);

      expect(response).to.be.a('object');
    });

    it('Should return the ID of the object ', async () => {
      const response = await productModel.createProduct(product.name, product.quantity);
      expect(response).to.have.a.property('id');
    });

  });

});

describe('Get the list of all products in the database', () => {
  const products = [
    { id: 1, name: "Churrasquinho", quantity: 10 },
    { id: 2, name: "Feijãozinho", quantity: 55 },
    { id: 3, name: "Linguicinha", quantity: 15 },
  ]

  before(async () => {
    const execute = [products, []]; 
    sinon.stub(connection, 'execute').resolves(execute);
  });

  after(async () => {
    connection.execute.restore();
  });


  it('Should return an array of objects with these properties', async () => {
    const response = await productModel.getAll();

    response.forEach((obj) =>{
      expect(obj).to.be.a('object');
      expect(obj).to.have.a.property('id');
      expect(obj).to.have.a.property('name');
      expect(obj).to.have.a.property('quantity');
    });
  });
})

describe('When the request have an valid ID', () => {
  const product = [{
    id: 2,
    name: "Churrasquinho",
    quantity: 50,
  }];
  const id = product[0].id;

  before(async () => {
    const execute = [product, []]; 
    sinon.stub(connection, 'execute').resolves(execute);
  });

  after(async () => {
    connection.execute.restore();
  });


  it('Should return these properties when the ID is equal to "2"', async () => {
    const response = await productModel.getById(id);

    expect(response[0]).to.be.a('object');
    expect(response[0]).to.have.a.property('id');
    expect(response[0]).to.have.a.property('name');
    expect(response[0]).to.have.a.property('quantity');
    expect(response).to.be.length(1);
  });
});

describe('Insert a new sale on the dabase', () => {

  before(async () => {
    const execute = [{ insertId: 1 }]; 
    sinon.stub(connection, 'execute').resolves(execute);
  });

  after(async () => {
    connection.execute.restore();
  });


  it('Should return a object', async () => {
    const response = await salesModel.addSale();
    expect(response).to.be.a('object');
  });

  it('Should have a valid ID', async () => {
    const response = await salesModel.addSale();
    expect(response).to.be.equal(1);
  });
});

describe('Get the list of all sales in the database', () => {
  const sales = [
    { id: 1, date: "2022-02-16T05:31:33.000Z" },
    { id: 2, date: "2022-02-16T05:32:12.000Z" },
    { id: 3, date: "2022-02-16T05:32:24.000Z" },
    { id: 4, date: "2022-02-16T05:33:23.000Z" },
  ];

  before(async () => {
    const execute = [sales, []]; 
    sinon.stub(connection, 'execute').resolves(execute);
  });

  after(async () => {
    connection.execute.restore();
  });

  const response = salesModel.getAll();
    response.forEach((obj) =>{
      expect(obj).to.be.a('object');
      expect(obj).to.have.a.property('id');
      expect(obj).to.have.a.property('date');
  });
});

describe('Get all the products sold in the database', () => {

  const sales = [
    {
      saleId: 1,
      date: "2022-02-16T05:45:33.000Z",
      product_id: 1,
      quantity: 10
    },
    {
      saleId: 2,
      date: "2022-02-16T05:46:20.000Z",
      product_id: 1,
      quantity: 20
    },
    {
      saleId: 3,
      date: "2022-02-16T05:46:24.000Z",
      product_id: 2,
      quantity: 20
    },
    {
      saleId: 4,
      date: "2022-02-16T05:46:35.000Z",
      product_id: 2,
      quantity: 30
    },
  ];

  before(async () => {
    const execute = [sales, []]; 
    sinon.stub(connection, 'execute').resolves(execute);
  });

  after(async () => {
    connection.execute.restore();
  });


  it(`Should have these properties`, async () => {
    const response = await salesModel.getAll()

    response.forEach((obj) =>{
      expect(obj).to.be.a('object');
      expect(obj).to.have.a.property('saleId');
      expect(obj).to.have.a.property('date');
      expect(obj).to.have.a.property('product_id');
      expect(obj).to.have.a.property('quantity');
      expect(response).to.be.length(4);
    });
  });
});

describe('Get the sale by ID', () => {

  const sale = [
    {
      date: "2022-02-16T06:06:20.000Z",
      product_id: 2,
      quantity: 20,
    },
    {
      date: "2022-02-16T06:10:04.000Z",
      product_id: 1,
      quantity: 50,
    },
  ]

    
  before(async () => {
    const execute = [sale, []]; 
    sinon.stub(connection, 'execute').resolves(execute);
  });
    
  after(async () => {
    connection.execute.restore();
  });
    
  it(`Should have these properties when ID is equal to 2 `, async () => {
    const response = await salesModel.getById(2)
    response.forEach((obj) =>{
      expect(obj).to.be.a('object');
      expect(obj).to.have.a.property('date');
      expect(obj).to.have.a.property('product_id');
      expect(obj).to.have.a.property('quantity');
      expect(response).to.be.length(2);
    });
  });
});
