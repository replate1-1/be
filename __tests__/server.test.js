const request = require('supertest');
const server = require('../api/server.js');

describe('server.js', () => {
  it('sets the environment to testing', () => {
    expect(process.env.DB_ENV).toBe('testing');
  });
});