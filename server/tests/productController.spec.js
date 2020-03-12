import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import app from '../index';
import mockData from './mock/mockData';
import pool from './../utils/pool';
import ProductHelper from './../helpers/productHelper';

const { expect } = chai;
chai.use(chaiHttp);
let adminToken;
let userToken;

describe('Products', () => {
    before(async () => {
        const response = await chai
            .request(app)
            .post('/api/v1/auth/login')
            .send(mockData.login);
        adminToken = response.body.data.token;

        const attendantResponse = await chai
            .request(app)
            .post('/api/v1/auth/login')
            .send(mockData.login);
        userToken = attendantResponse.body.data.token;
    })
})