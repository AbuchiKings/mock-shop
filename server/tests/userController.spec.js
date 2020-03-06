import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import app from '../index';
import mockData from './mock/mockData';
import usersData from './mock/mockUserDb'
import UserHelper from '../helpers/userHelper';
import pool from './../utils/pool';

const { expect } = chai;
chai.use(chaiHttp);

describe('Mock Shop', () => {
    it('It should be able to catch all undefined routes', async () => {
        const response = await chai.request(app).get('/unknown');
        expect(response.status).to.equal(404);
    });
});

describe('User', () => {
    describe('Sign up User', () => {
        it('Invalid User details should return errors', async () => {
            const response = await chai
                .request(app)
                .post('/api/v1/auth/signup')
                .send(mockData.signUp.invalidNewUser);

            expect(response.status).to.equal(422);
            expect(response.body).to.have.property('errors');
            expect(response.body.errors).to.be.an('array');
            expect(response.body.errors[0]).to.have.property('msg');
        });

        it('Invalid email address should return an error', async () => {
            const response = await chai
                .request(app)
                .post('/api/v1/auth/signup')
                .send(mockData.signUp.invalidEmailAddress);

            expect(response.status).to.equal(422);
            expect(response.body).to.have.property('errors');
            expect(response.body.errors).to.be.an('array');
            expect(response.body.errors[0].msg).to.equal('Invalid email address');
        });

        it('Database error should be handled', async () => {
            const userHelperStub = sinon.stub(UserHelper, 'createUser').returns(new Error());
            const response = await chai
                .request(app)
                .post('/api/v1/auth/signup')
                .send(mockData.signUp.validUserSignup);

            expect(response.status).to.equal(500);
            userHelperStub.restore();
        });

        it('Valid user details with used email should return an error', async () => {
            sinon.stub(pool, 'query').returns(usersData.foundUser);
            const response = await chai
                .request(app)
                .post('/api/v1/auth/signup')
                .send(mockData.signUp.validUserSignup);

            expect(response.status).to.equal(409);
            expect(response.body).to.have.property('status');
            expect(response.body).to.have.property('message');
            expect(response.body.message).to.equal('Email address is already in use');
            pool.query.restore();
        });
    });

    describe('Login User', () => {
        it('Invalid user email should return an error', async () => {
            const response = await chai
              .request(app)
              .post('/api/v1/auth/login')
              .send(mockData.login.invalidEmailAddress);
      
            expect(response.status).to.equal(422);
            expect(response.body).to.have.property('errors');
            expect(response.body.errors).to.be.an('array');
            expect(response.body.errors[0].msg).to.equal('Invalid email address');
          });
    });
});