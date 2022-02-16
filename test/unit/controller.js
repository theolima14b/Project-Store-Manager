const { expect } = require('chai');
const sinon = require('sinon');
const { equal } = require('@hapi/joi/lib/base');

const productController = require('../../controllers/product');
const productService = require('../../services/product');

const salesController = require('../../controllers/sales');
const salesService = require('../../services/sales');

describe('Testa a camada productController', () => {
  describe('Testa se /GET lista todos os produtos', () => {
    const response = {};
    const request = {};

    before (() => {
      response.status = sinon.stub().returns(response.status);
      response.json = sinon.stub().returns;

      sinon.stub(productService, 'getAll').resolves(true);
    });

    after(() => {
      productService.getAll.restore();
    });

    it('Valida que todos os produtos estão sendo retornados', async () => {
      await productController.getAll(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true)
    });

    before(() => {
      request.params = [{ id: 1}]

      response.status = sinon.stub().returns(response.status);
      response.json = sinon.stub().returns;

      sinon.stub(productService, 'getById').resolves(true)
    });

    after(() => {
      productService.getById.restore();
    });

    it('Retorna um produto quando a requisição tem um ID válido', async () => {
      await productController.getById(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    describe('Testa se o endpoint /PUT atualiza um produto', () => {
      const response = {};
      const request = {};
  
      before(() => {
        request.params = [{ id: 2 }];
        request.body = [{ name: 'churrasquinho', quantity: 10 }];
  
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
  
        sinon.stub(productService, 'updateProduct').resolves(true);
        sinon.stub(productService, 'getById').resolves(true);
      });
      after(() => {
        productService.updateProduct.restore();
        productService.getById.restore();
      });
  
      it('Altera o produto quando a requisição é válida', async () => {
        await productController.updateProduct(request, response);
  
        expect(response.status.calledWith(200)).to.be.equal(true);
      });
    });
  });
  
  describe('Testa a camada productController', () => {
    describe('Testa se o endpoint /POST cadastra um produto', () => {
      const response = {};
      const request = {};
  
      before(() => {
        request.body = [{ product_id: 1, quantity: 10 }];
  
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
  
        sinon.stub(salesService, 'addSale').resolves(true);
      });
      after(() => {
        salesService.addSale.restore();
      });
  
      it('Responde com código 201 para uma requisição válida', async () => {
        await salesController.addSale(request, response);
  
        expect(response.status.calledWith(201)).to.be.equal(true);
      });
    });
  
    describe('Testa se /GET lista todas as sales', () => {
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
  
      it('Testa se todas as sales estão sendo retornardas', async () => {
        await salesController.getAll(request, response);
  
        expect(response.status.calledWith(200)).to.be.equal(true);
      });
  
      before(() => {
        request.params = [{ id: 1 }];
  
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
  
        sinon.stub(salesService, 'getById').resolves(true);
      });
      after(() => {
        salesService.getById.restore();
      });
  
      it('Retorna uma sale quando a requisição tem um ID válido', async () => {
        await salesController.getById(request, response);
  
        expect(response.status.calledWith(200)).to.be.equal(true);
      });
    });
  });
});
