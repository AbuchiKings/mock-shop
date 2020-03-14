import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import app from '../index';
import mockData from './mock/mockData';
import pool from './../utils/pool';
import ProductHelper from './../helpers/productHelper';
import mockUserDb from './mock/mockUserDb';

const { expect } = chai;
chai.use(chaiHttp);
let adminToken;
let userToken;

describe('Products', () => {
    before(async () => {
        const poolStub = sinon.stub(pool, 'query');
        poolStub.onCall(0).returns(mockUserDb.foundUser);
        poolStub.returns({ ...mockUserDb.foundUser, [mockUserDb.foundUser.rows[0].is_admin]: false,
             [mockUserDb.foundUser.rows[0].id]: 4 });
        const response = await chai
            .request(app)
            .post('/api/v1/auth/login')
            .send(mockData.login.validDetails);
        adminToken = response.body.data.token;

        const userRes = await chai
            .request(app)
            .post('/api/v1/auth/login')
            .send(mockData.login.validDetails);
        console.log(userRes);
        userToken = userRes.body.data.token;
        poolStub.restore();
    });
    describe('Create product', () => {
        describe('When a user tries to create a product no headers set', () => {
            it('It should return an unauthorized error', async () => {
                sinon.stub(pool, 'query').returns(mockUserDb.foundUser);
                const response = await chai
                    .request(app)
                    .post('/api/v1/products')
                    .send(mockData.product.validProduct);

                expect(response.status).to.equal(401);
                expect(response.body.message).to.equal('Headers not set');
            });
        });
    });
});