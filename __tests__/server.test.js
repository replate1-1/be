const request = require('supertest');
const server = require('../api/server.js');

describe('server.js', () => {
  it('sets the environment to testing', () => {
    expect(process.env.DB_ENV).toBe('testing');
  });

  describe('/GET', () => {
    it('connects and returns a 200 status', async () => {
      const res = await request(server).get('/');
      expect(res.status).toBe(200);
    });
    it('should return success message', async () => {
      const res = await request(server).get('/');
      expect(res.body).toEqual({ message: "Server up and running!"});
    });
  }); 
});

//TODO - actually write the server code to make these run green.