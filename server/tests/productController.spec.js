import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import app from '../index';
import mockData from './mock/mockData';
import pool from '../utils/pool';
import ProductHelper from '../helpers/productHelper';
import mockUserDb from './mock/mockUserDb';
import mockProducts from './mock/mockProductDb';

const { expect } = chai;
chai.use(chaiHttp);
let adminToken;
let userToken;

describe('Products', () => {
    before(async () => {
        sinon.stub(pool, 'query').returns(mockUserDb.foundUser);

        const response = await chai
            .request(app)
            .post('/api/v1/auth/login')
            .send(mockData.login.validDetails);
        adminToken = response.body.data.token;
        pool.query.restore();

        sinon.stub(pool, 'query').returns(mockUserDb.user);
        const userRes = await chai
            .request(app)
            .post('/api/v1/auth/login')
            .send(mockData.login.validDetails);
        userToken = userRes.body.data.token;
        pool.query.restore();
    });


    describe('Create product', () => {
        describe('When admin tries to create a product no headers set', () => {
            it('It should return an unauthorized error', async () => {
                const response = await chai
                    .request(app)
                    .post('/api/v1/products')
                    .send(mockData.products.validProduct);

                expect(response.status).to.equal(401);
                expect(response.body.message).to.equal('Headers not set');
            });
        });

        describe('When a non-admin tries to create a product', () => {
            it('It should return an unauthorized error', async () => {
                const response = await chai
                    .request(app)
                    .post('/api/v1/products')
                    .set('Authorization', `Bearer ${userToken}`)
                    .send(mockData.products.validProduct);

                expect(response.status).to.equal(403);
                expect(response.body.message).to.equal('Unauthorized Access. For admins/owner accounts only');
            });
        });

        describe('When an invalid new product is posted', () => {
            it('It should return an unprocessible entity error', async () => {
                const response = await chai
                    .request(app)
                    .post('/api/v1/products')
                    .set('Authorization', `Bearer ${adminToken}`)
                    .send(mockData.products.invalidProduct);

                expect(response.status).to.equal(422);
                expect(response.body).to.have.property('errors');
            });
        });

        describe('When an admin tries to create an already existing product', () => {
            it('It should return a conflict error', async () => {
                sinon.stub(pool, 'query').returns(mockProducts.product);
                const response = await chai
                    .request(app)
                    .post('/api/v1/products')
                    .set('Authorization', `Bearer ${adminToken}`)
                    .send(mockData.products.validProduct);

                expect(response.status).to.equal(409);
                expect(response.body.message).to.equal('The provided product name already exists');
                pool.query.restore();
            });
        });

        describe('Database error should be handled', () => {
            it('It should return a server error', async () => {
                sinon.stub(pool, 'query').returns(new Error());

                const response = await chai
                    .request(app)
                    .post('/api/v1/products')
                    .set('Authorization', `Bearer ${adminToken}`)
                    .send(mockData.products.validProduct);

                expect(response.status).to.equal(500);
                pool.query.restore();
            });
        });

        describe('When an admin tries to create a new product with valid details and headers', () => {
            it('It should return the newly created product', async () => {
                const poolStub = sinon.stub(pool, 'query');
                poolStub.onCall(0).returns(mockProducts.nonexistingProduct);
                poolStub.returns(mockProducts.product);

                const response = await chai
                    .request(app)
                    .post('/api/v1/products')
                    .set('Authorization', `Bearer ${adminToken}`)
                    .send(mockData.products.validProduct);

                expect(response.status).to.equal(201);
                expect(response.body.status).to.equal('success');
                expect(response.body).to.have.property('data');
                pool.query.restore();
            });
        });
    });


    describe('Update product', () => {
        describe('When admin tries to update a product no headers set', () => {
            it('It should return an unauthorized error', async () => {
                const response = await chai
                    .request(app)
                    .post('/api/v1/products/13')
                    .send(mockData.products.validProduct);

                expect(response.status).to.equal(401);
                expect(response.body.message).to.equal('Headers not set');
            });
        });

        describe('When admin tries to update a product no ', () => {
            it('It should return an unauthorized error', async () => {
                const response = await chai
                    .request(app)
                    .post('/api/v1/products/13')
                    .send(mockData.products.validProduct);

                expect(response.status).to.equal(401);
                expect(response.body.message).to.equal('Headers not set');
            });
        });
    });
});
