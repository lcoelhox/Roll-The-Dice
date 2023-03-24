const request = require('supertest');
const { expect } = require('chai');
const app = require('../api/app');

describe('testing app', () => {
  it('returns a 201 response', () => {
    return request(app)
      .post('/roll')
      .send({ sides: 6 })
      .expect(201);
  });

  it('returns a JSON object with the dice roll result', () => {
    return request(app)
      .post('/roll')
      .send({ sides: 6 })
      .expect('Content-Type', /json/)
      .then(response => {
        expect(response.body).to.have.property('result');
        expect(response.body.result).to.be.a('number');
        expect(response.body.result).to.be.at.least(1);
        expect(response.body.result).to.be.at.most(6);
      });
  });
});