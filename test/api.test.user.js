import supertest from 'supertest';
import { expect, should } from 'chai';
import app from '../server';

const temp = {};
const request = supertest.agent(app.listen());
should();

describe('POST api/authenticate', () => {
  it('should get the token', done => {
    request
      .post('/api/authenticate')
      .set('Accept', 'application/json')
      .send({
        password: 'password'
      })
      .expect(200, (err, res) => {
        temp.token = res.body.token;
        done();
      })
  });
});

describe('GET /user', () => {
  it('should get all user', done => {
    request
      .get('/api/user')
      .set('Authorization', `Bearer ${temp.token}`)
      .set('Accept', 'application/json')
      .expect(200, (err, res) => {
        expect(res.body.length).to.be.at.least(1);
        done();
      });
  });
});

describe('POST /user', () => {
  it('should add a user', done => {
    request
      .post('/api/user')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${temp.token}`)
      .set('Accept', 'application/json')
      .send({
        LoginName: 'yao',
        name: 'yaojian',
        sex: 1
      })
      .expect(200, (err, res) => {
        temp.idCity = res.body._id;
        done();
      });
  });
});