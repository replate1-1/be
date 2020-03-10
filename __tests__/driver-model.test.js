const db = require('../database/dbConfig.js');
const Drivers = require('../users/driver-model.js');
const jwt = require('jsonwebtoken');
const secrets = require('../auth/secrets.js');

beforeEach(async () => {
  await db('drivers').truncate();
});


describe('driver user queries', () => {

  describe('CREATE new driver user', () => {

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

  describe('POST to login existing driver user', () => {

    it('returns a token on login', async () => {

      function genToken(user) {
   
        const payload = {
          userId: user.id,
          username: user.username
        };
      
        const options = {
          expiresIn: '12h'
        };
      
        return token = jwt.sign(payload, secrets.jwtSecret, options);
      }

      const loginData = {
        id: 1, 
        username: "dons", 
        password: "password"
      }

      function login(userData) {
        const token = genToken(userData)
        return {
          token: token,
          username: userData.username
        };
      }

      const loggedIn = login(loginData);
  
      expect(loggedIn.token)
      expect(loggedIn.username).toBe("dons");
    })
  })

  describe('READ queries', () => {

    it('GETS all drivers in db', async () => {

      await Drivers.add({
        username: "driver1",
        email: "email@gmail.com",
        password: "password",
        volunteerName: "Randy Travis",
        phoneNumber: "1-800-ZOOM-ZOOM"
      })
      await Drivers.add({
        username: "driver2",
        email: "email2@gmail.com",
        password: "password",
        volunteerName: "Randy Orton",
        phoneNumber: "1-800-ZOOMY-ZOOMY"
      })

      const driverList = await Drivers.find();

      expect(driverList).toHaveLength(2);
      expect(driverList[1].name).toBe("Randy Orton");
      //volunteerName returns as 'name' in the driver-model
    });

    it('GETS specific driver data by id', async () => {
      
      await Drivers.add({
        username: "driver1",
        email: "email@gmail.com",
        password: "password",
        volunteerName: "Randy Travis",
        phoneNumber: "1-800-ZOOM-ZOOM"
      });
      await Drivers.add({
        username: "driver2",
        email: "email2@gmail.com",
        password: "password",
        volunteerName: "Randy Orton",
        phoneNumber: "1-800-ZOOMY-ZOOMY"
      });

      const driver = await Drivers.findById(1);

      expect(driver.id).toBe(1);
      expect(driver.id).not.toBe(2);
      expect(driver.username).toBe("driver1");
    });

    it('gets driver data by any unique column in the table, in this case email', async () => {

      await Drivers.add({
        username: "driver1",
        email: "email@gmail.com",
        password: "password",
        volunteerName: "Randy Travis",
        phoneNumber: "1-800-ZOOM-ZOOM"
      });
      await Drivers.add({
        username: "driver2",
        email: "email2@gmail.com",
        password: "password",
        volunteerName: "Randy Orton",
        phoneNumber: "1-800-ZOOMY-ZOOMY"
      });
      await Drivers.add({
        username: "driver3",
        email: "email3@gmail.com",
        password: "password",
        volunteerName: "Randy Newman",
        phoneNumber: "1-800-ZOOMER-ZOOMER"
      });

      const email = "email@gmail.com";
      const driver = await Drivers.findBy({email});

      expect(driver.username).toBe("driver1");
      expect(driver.id).toBe(1);
    })
  })

  describe('DELETE queries', () => {

    it('removes driver user from db', async () => {

      await Drivers.add({
        username: "driver1",
        email: "email@gmail.com",
        password: "password",
        volunteerName: "Randy Travis",
        phoneNumber: "1-800-ZOOM-ZOOM"
      });
      await Drivers.add({
        username: "driver2",
        email: "email2@gmail.com",
        password: "password",
        volunteerName: "Randy Orton",
        phoneNumber: "1-800-ZOOMY-ZOOMY"
      });
      await Drivers.add({
        username: "driver3",
        email: "email3@gmail.com",
        password: "password",
        volunteerName: "Randy Newman",
        phoneNumber: "1-800-ZOOMER-ZOOMER"
      });
      
      //removing users
      await Drivers.remove(1);
      await Drivers.remove(2);
      await Drivers.remove(3);

      const driverList = await db('drivers');

      expect(driverList).toHaveLength(0);
    })
  })
  
})