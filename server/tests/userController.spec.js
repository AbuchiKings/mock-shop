import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import app from '../index';
import mockData from './mock/mockData';
import usersData from './mock/mockUserDb'
import UserHelper from '../helpers/userHelper';
import pool from './../utils/pool';
import mockUserDb from './mock/mockUserDb';

const { expect } = chai;
chai.use(chaiHttp);
let token;

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

        it('Valid user details with new email should return a new user', async () => {
            const poolStub = sinon.stub(pool, 'query');
            poolStub.onCall(0).returns(usersData.notFoundUser);
            poolStub.returns(usersData.foundUser);
            const response = await chai
                .request(app)
                .post('/api/v1/auth/signup')
                .send(mockData.signUp.validUserSignup);

            expect(response.status).to.equal(201);
            poolStub.restore();
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

        it('Empty password field should return an error', async () => {
            const response = await chai
                .request(app)
                .post('/api/v1/auth/login')
                .send(mockData.login.emptyPassowrd);

            expect(response.status).to.equal(422);
            expect(response.body).to.have.property('errors');
            expect(response.body.errors).to.be.an('array');
        });

        it('Wrong password should return an invalid password error', async () => {
            sinon.stub(pool, 'query').returns(mockUserDb.foundUser);
            const response = await chai
                .request(app)
                .post('/api/v1/auth/login')
                .send(mockData.login.invalidPassword);

            expect(response.status).to.equal(401);
            expect(response.body).to.have.property('status');
            expect(response.body).to.have.property('message');
            expect(response.body.message).to.equal('Password is incorrect');
            pool.query.restore();
        });

        it('Database error should be handled', async () => {
            const userHelperStub = sinon.stub(UserHelper, 'loginUser').returns(new Error());
            const response = await chai
                .request(app)
                .post('/api/v1/auth/login')
                .send(mockData.login.validDetails);

            expect(response.status).to.equal(500);
            userHelperStub.restore();
        });


        it('Valid user login details should return a successful login', async () => {
            sinon.stub(pool, 'query').returns(mockUserDb.foundUser);
            const response = await chai
                .request(app)
                .post('/api/v1/auth/login')
                .send(mockData.login.validDetails);

            token = response.body.data.token;

            expect(response.status).to.equal(200);
            expect(response.body.message).to.equal('Login successful');
            expect(response.body).to.have.property('data');
            expect(response.body.data).to.have.property('token');
            pool.query.restore();
        });
    });
});