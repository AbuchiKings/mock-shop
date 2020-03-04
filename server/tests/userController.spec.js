import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import app from '../index';
import mockData from './mockData';
import UserHelper from '../helpers/userHelper';

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
    });
});