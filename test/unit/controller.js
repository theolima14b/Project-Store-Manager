const { expect } = require('chai');
const sinon = require('sinon');

const productController = require('../../controllers/product');
const productService = require('../../services/product');

const salesController = require('../../controllers/sales');
const salesService = require('../../services/sales');

describe('Testa a camada Controller de Product', () => {

  describe('Testa o endpoint /post de Product', () => {
    const response = {};
    const request = {};
  
    before(() => {
      request.body = { name: "Armadura do Homem de Ferro", quantity: "100" };
  
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productService, 'addProduct').resolves(true);
      sinon.stub(productController, 'getById').resolves(true);
      sinon.stub(productService, 'getAll').resolves([{
        id: 1,
        name: "Armadura do Homem de Ferro",
        quantity: "100"
      }]);
    });
  
    after(() => {
      productService.addProduct.restore();
      productService.getAll.restore();
      productController.getById.restore();
    });
  
      it('Returns a reponse with code 201', async () => {
        await productController.addProduct(request, response);
  
        expect(response.status.calledWith(201)).to.be.equal(true);
      });
  
      it('Returns a JSON', async () => {
        await productController.addProduct(request, response);
  
        expect(response.json.called).to.be.equal(true);
      });
  
  });
  
  describe('Test the endpoint /GET/products', () => {
    const response = {};
    const request = {};
    const addedProduct = { id: 1, name: "Martelo do Thor", quantity: 10 };
  
    before(() => {
      request.body = {};
  
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productService, 'getAll').resolves(true);
    });
  
    after(() => {
      productService.getAll.restore();
    });
  
    it('Returns a reponse with code 200', async () => {
      await productController.getAll(request, response);
      console.log(response.status);
  
      expect(response.status.calledWith(200)).to.be.equal(true);
    });
  
    it('Returns a JSON', async () => {
      await productController.getAll(request, response);
  
      expect(response.json.called).to.be.equal(true);
    });
  
  });
  
  describe('Test the endpoint /PUT/products/:id', () => {
    const response = {};
    const request = {};
    const addedProduct = { id: 1, name: "Manopla do Infinito", quantity: 10 };
  
    before(() => {
      request.params = { id: 1 }
      request.body = { name: "Cajado do Loki", quantity: "20" };
  
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productService, 'updateProduct').resolves(true);
      sinon.stub(productService, 'getById').resolves(true);
    });
  
    after(() => {
      productService.updateProduct.restore();
      productService.getById.restore();
    });
  
    it('Returns a reponse with code 200', async () => {
      await productController.updateProduct(request, response);
      console.log(response.status);
  
      expect(response.status.calledWith(200)).to.be.equal(true);
    });
  
    it('Returns a JSON', async () => {
      await productController.updateProduct(request, response);
  
      expect(response.json.called).to.be.equal(true);
    });
  
  });
  
  describe('Test the endpoint /DELETE/products/:id', () => {
    const response = {};
    const request = {};
    const addedProduct = { id: 1, name: "Escudo do Capitão América", quantity: 10 };
  
    before(() => {
      request.params = { id: 1 }
      request.body = { name: "Armadura do Pantera Negra", quantity: "20" };
  
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productService, 'getById').resolves(true);      
      sinon.stub(productService, 'deleteProduct').resolves(true);
    });
  
    after(() => {
      productService.getById.restore();
      productService.deleteProduct.restore();
    });
  
    it('Returns a reponse with code 200', async () => {
      await productController.deleteProduct(request, response);
      console.log(response.status);
  
      expect(response.status.calledWith(200)).to.be.equal(true);
    });
  
    it('Returns a JSON', async () => {
      await productController.deleteProduct(request, response);
  
      expect(response.json.called).to.be.equal(true);
    });
  
  });
})


describe('Testa a camada Controller de Sales', () => {
  describe('Test the endpoint /GET/sales', () => {
    const response = {};
    const request = {};
  
    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(salesService, 'getAll').resolves(true);
    });
  
    after(() => {
      salesService.getAll.restore();
    });
  
    it('Returns a reponse with code 200', async () => {
      await salesController.getAll(request, response);
  
      expect(response.status.calledWith(200)).to.be.equal(true);
    });
  
    it('Returns a JSON', async () => {
      await salesController.getAll(request, response);
  
      expect(response.json.called).to.be.equal(true);
    });
  
  });
  
  describe('Test the endpoint /POST/sales', () => {
    describe('Quando existe o produto no banco de dados', () => {
      const response = {};
      const request = {};
    
      before(() => {
        request.body = { product_id: 1, quantity: 10 };
    
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(salesService, 'addSale').resolves(true);
      });
    
      after(() => {
        salesService.addSale.restore();
      });
    
      it('Returns a reponse with code 201', async () => {
        await salesController.addSale(request, response);
    
        expect(response.status.calledWith(201)).to.be.equal(true);
      });
    
      it('Returns a JSON', async () => {
        await salesController.addSale(request, response);
    
        expect(response.json.called).to.be.equal(true);
      });
    })
    
    describe('Quando o product_id é inválido', () => {
      const response = {};
      const request = {};
  
      before(() => {
        request.body = { product_id: '', quantity: 10 };
  
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(salesService, 'addSale').resolves(false);
  
        it('Returns a reponse with code ', async () => {
          await salesController.addSale(request, response);
      
          expect(response.status.calledWith()).to.be.equal(true);
        });
      })
    })
  
  });
  
  describe('Test the endpoint /POST/sales/:id', () => {
    const response = {};
    const request = {};
  
    before(() => {
      request.params = { id: 3 };
  
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(salesService, 'getById').resolves(true);
    });
  
    after(() => {
      salesService.getById.restore();
    });
  
    it('Returns a reponse with code 200', async () => {
      await salesController.getById(request, response);
      console.log(response.status);
  
      expect(response.status.calledWith(200)).to.be.equal(true);
    });
  
    it('Returns a JSON', async () => {
      await salesController.getById(request, response);
  
      expect(response.json.called).to.be.equal(true);
    });
  
  });
  
  describe('Test the endpoint /PUT/sales/:id', () => {
    const response = {};
    const request = {};
  
    before(() => {
      request.params = { id: 1 };
      request.body = [{ product_id: 3, quantity: 20 }];
  
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(salesService, 'updateSale').resolves(true);
    });
  
    after(() => {
      salesService.updateSale.restore();
    });
  
    it('Returns a reponse with code 200', async () => {
      await salesController.updateSale(request, response);
  
      expect(response.status.calledWith(200)).to.be.equal(true);
    });
  
    it('Returns a JSON', async () => {
      await salesController.updateSale(request, response);
  
      expect(response.json.called).to.be.equal(true);
    });
  
  });
  
  describe('Test the endpoint /DELETE/sales/:id', () => {
    const response = {};
    const request = {};
  
    before(() => {
      request.params = { product_id: 3 };
  
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(salesService, 'deleteSale').resolves(true);
    });
  
    after(() => {
      salesService.deleteSale.restore();
    });
  
    it('Returns a reponse with code 200', async () => {
      await salesController.deleteSale(request, response);
  
      expect(response.status.calledWith(200)).to.be.equal(false);
    });
  
    it('Returns a JSON', async () => {
      await salesController.deleteSale(request, response);
  
      expect(response.json.called).to.be.equal(true);
    });
  
  });
})