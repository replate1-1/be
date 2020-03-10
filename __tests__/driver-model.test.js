const db = require('../database/dbConfig.js');
const Drivers = require('../users/driver-model.js');

beforeEach(async () => {
  await db('drivers').truncate();
});

//POST driver user
describe('driver user queries', () => {

  describe('POST new driver user', () => {

    it('adds a new driver to the db', async () => {
      await Drivers.add({
        username: 'zoomzoom1',
        email: 'mail@gmail.com',
        password: 'pass',
        volunteerName: 'Craig David',
        phoneNumber: '123456789'
      });
      await Drivers.add({
        username: 'zoomzoom2',
        email: 'mail2@gmail.com',
        password: 'pass',
        volunteerName: 'Craig David',
        phoneNumber: '1342332423'
      });
      await Drivers.add({
        username: 'zoomzoom3',
        email: 'mail3@gmail.com',
        password: 'pass',
        volunteerName: 'Craig David',
        phoneNumber: '1-800-SAFE-AUTO'
      });

      const drivers = await db('drivers');
      expect(drivers).toHaveLength(3);
    })

    it('should return new user data', async() => {
      let driver = await Drivers.add({
        username: 'zoomzoom3',
        email: 'mail3@gmail.com',
        password: 'pass',
        volunteerName: 'Craig David',
        phoneNumber: '1-800-SAFE-AUTO'
      });
      expect(driver.username).toBe('zoomzoom3');
    })
  })
})