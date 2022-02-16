const sinon = require('sinon');
const { expect } = require('chai');

const { connection } = require('../../models/connection');
const productModel = require('../../models/product');
const salesModel = require('../../models/sales');

const error = 'Falha inesperada na comunicação com banco de dados';

describe('I - Camada "ProductsModels"', () => {
  describe('1 - Testa o endpoint "getAllProducts"', () => {
    
    before(async () => {
      const getAllMock = [[
        {
          "id": 1,
          "name": "product test",
          "quantity": 15
        },
        {
          "id": 2,
          "name": "product",
          "quantity": 10
        },
        {
          "id": 3,
          "name": "new product",
          "quantity": 30
        }
      ], null];

      sinon.stub(connection, 'execute').resolves(getAllMock);
    })
    
    after(async () => { 
      connection.execute.restore() 
    });

    it('Retorna todos os produtos cadastrados no BD', async () => {
      const RESULT_GET_ALL = await productModel.getAll();

      expect(Array.isArray(RESULT_GET_ALL)).to.be.equal(true);
      expect(RESULT_GET_ALL).to.have.length(3);
      expect(RESULT_GET_ALL[0]).to.have.a.property('id');
      expect(RESULT_GET_ALL[1]).to.have.a.property('quantity');
      expect(RESULT_GET_ALL[2]).to.have.a.property('name');
    });
  });
});

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
      const response = await productModel.addProduct(product.name, product.quantity);

      expect(response[0]).to.be.a('object');
    });

    it('Should return the ID of the object ', async () => {
      const response = await productModel.addProduct(product.name, product.quantity);
      expect(response[0]).to.have.a.property('insertId');
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
  const id = product.id;

  before(async () => {
    const execute = [product, []]; 
    sinon.stub(connection, 'execute').resolves(execute);
  });

  after(async () => {
    connection.execute.restore();
  });


  it('Should return these properties when the ID is equal to "2"', async () => {
    const response = await productModel.getById(id);

    expect(response).to.be.a('object');
    expect(response).to.have.a.property('id');
    expect(response).to.have.a.property('name');
    expect(response).to.have.a.property('quantity');
  });
});

// describe('Insert a new sale on the dabase', () => {

//   before(async () => {
//     const execute = [{ insertId: 1 }]; 
//     sinon.stub(connection, 'execute').resolves(execute);
//   });

//   after(async () => {
//     connection.execute.restore();
//   });


//   it('Should return a object', async () => {
//     const response = await salesModel.addSale({ product_id: 1, quantity: 10});

//     expect(response).to.be.a('object');
//   });

//   it('Should have a valid ID', async () => {
//     const response = await salesModel.addSale();
//     expect(response).to.be.equal(1);
//   });
// });

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
  expect(Array.isArray(response)).to.be.equal(false);
});

describe('Get the sale by ID', () => {

  const sale = 
    {
      date: "2022-02-16T06:06:20.000Z",
      product_id: 2,
      quantity: 20,
    };
  

    
  before(async () => {
    const execute = [sale, []]; 
    sinon.stub(connection, 'execute').resolves(execute);
  });
    
  after(async () => {
    connection.execute.restore();
  });
    
  it(`Should have these properties when ID is equal to 1 `, async () => {
    const response = await salesModel.getById(1)
      expect(Array.isArray(response)).to.be.equal(true);
      expect(response[0]).to.have.a.property('date');
      expect(response[0]).to.have.a.property('product_id');
      expect(response[0]).to.have.a.property('quantity');
    });
});
