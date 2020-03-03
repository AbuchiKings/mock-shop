import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import app from '../index';
//import mockData from '../mock';
import UserHelper from '../helpers/userHelper';

const { expect } = chai;
chai.use(chaiHttp);

describe('Mock Shop', () => {
    it('It should be able to catch all undefined routes', async () => {
      const response = await chai.request(app).get('/unknown');
      expect(response.status).to.equal(404);
    });
  });