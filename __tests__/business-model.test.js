const db = require('../database/dbConfig.js');
const Biz = require('../users/business-model.js');
const jwt = require('jsonwebtoken');
const secrets = require('../auth/secrets.js');

beforeEach(async () => {
  await db('businesses').truncate();
});

describe('business user queries', () => {
  
  describe('CREATE queries', () => {

    it('adds a new business to the db this also involves the findById function to return the newly added business info', async () => {

      await Biz.add({
        username: 'biz1',
        email: 'coolemail',
        password: 'pass',
        businessName: 'Yummy Restaurant',
        businessAddress: '123 Street Ave',
        phoneNumber: '1-800-FOOD'
      });
      await Biz.add({
        username: 'biz2',
        email: 'email@gmail.com',
        password: 'pass',
        businessName: 'Gross Food Restaurant',
        businessAddress: '123 Street Place',
        phoneNumber: '1-800-YUMMY'
      });
      await Biz.add({
        username: 'biz3',
        email: 'coolemail@yahoo.com',
        password: 'pass',
        businessName: 'Go To McDonalds Restaurant',
        businessAddress: '123 Street Circle',
        phoneNumber: '1-800-FRIED'
      });

      const businesses = await db('businesses');
      expect(businesses).toHaveLength(3);
    })

    it('should return new user data', async() => {

      let business = await Biz.add({
        username: 'biz4',
        email: 'email@email.com',
        password: 'pass',
        businessName: 'Yummy Restaurant',
        businessAddress: '123 Street Ave',
        phoneNumber: '1-800-FOOD'
      });

      expect(business.username).toBe('biz4');
      expect(business.email).toBe('email@email.com');
    })
  })

  describe('POST to login existing biz user', () => {

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

    //?more login POST tests
  })

  describe('READ queries', () => {
    it('GETs all businesses in db', async () => {
      //Adding records to db
      await Biz.add({
        username: 'biz1',
        email: 'coolemail',
        password: 'pass',
        businessName: 'Yummy Restaurant',
        businessAddress: '123 Street Ave',
        phoneNumber: '1-800-FOOD'
      });
      await Biz.add({
        username: 'biz2',
        email: 'email@gmail.com',
        password: 'pass',
        businessName: 'Gross Food Restaurant',
        businessAddress: '123 Street Place',
        phoneNumber: '1-800-YUMMY'
      });
      await Biz.add({
        username: 'biz3',
        email: 'coolemail@yahoo.com',
        password: 'pass',
        businessName: 'Go To McDonalds Restaurant',
        businessAddress: '123 Street Circle',
        phoneNumber: '1-800-FRIED'
      });

      //reading db rows
      const bizList = await Biz.find();
      
      expect(bizList).toHaveLength(3);
      expect(bizList[0].email).toBe('coolemail');
    })

    it('GETs specfic user data by id', async () => {
      //Adding biz info
      await Biz.add({
        username: 'biz1',
        email: 'coolemail',
        password: 'pass',
        businessName: 'Yummy Restaurant',
        businessAddress: '123 Street Ave',
        phoneNumber: '1-800-FOOD'
      });
      await Biz.add({
        username: 'biz2',
        email: 'email@gmail.com',
        password: 'pass',
        businessName: 'Gross Food Restaurant',
        businessAddress: '123 Street Place',
        phoneNumber: '1-800-YUMMY'
      });

      const business = await Biz.findById(2);

      expect(business.id).toBe(2);
      expect(business.id).not.toBe(1);
    })

    it('GETS user data by any unique column in the table, in this case by username', async () => {

      await Biz.add({
        username: 'dons',
        email: 'coolemail',
        password: 'pass',
        businessName: "Don's Restaurant",
        businessAddress: '123 Street Ave',
        phoneNumber: '1-800-FOOD'
      });
      await Biz.add({
        username: 'bett13',
        email: 'email@gmail.com',
        password: 'pass',
        businessName: 'Big Betty Diner',
        businessAddress: '123 Street Place',
        phoneNumber: '1-800-YUMMY'
      });
      await Biz.add({
        username: 'biz3',
        email: 'coolemail@yahoo.com',
        password: 'pass',
        businessName: 'Go To McDonalds Restaurant',
        businessAddress: '123 Street Circle',
        phoneNumber: '1-800-FRIED'
      });

      const username = 'dons';
      const business = await Biz.findBy({ username });

      expect(business.id).toBe(1);
      expect(business.businessName).toBe("Don's Restaurant");
    })

    //the function for the facilities is written out in the business-model file. Since it's just the one read function it currently doesn't have it's own file. Maybe when more CRUD operations are written for the facilities it will. Right now it's just used as a helpful resource for those in need and as a way to direct the driver users when delivering accepted pickups.

    it('gets list of all facilities in db', async () => {
      const facilities = await Biz.findFacilities();
      //this table is seeded and prepopulated with data

      expect(facilities).toHaveLength(6);
      expect(facilities[0].facilityName).toBe("Martin de Porres House of Hospitality");
    })
  })

  describe('DELETE queries', () => {
    it('removes specified business user from db uses id to identify', async () => {

      await Biz.add({
        username: 'dons',
        email: 'coolemail',
        password: 'pass',
        businessName: "Don's Restaurant",
        businessAddress: '123 Street Ave',
        phoneNumber: '1-800-FOOD'
      });
      await Biz.add({
        username: 'bett13',
        email: 'email@gmail.com',
        password: 'pass',
        businessName: 'Big Betty Diner',
        businessAddress: '123 Street Place',
        phoneNumber: '1-800-YUMMY'
      });
      await Biz.add({
        username: 'biz3',
        email: 'coolemail@yahoo.com',
        password: 'pass',
        businessName: 'Go To McDonalds Restaurant',
        businessAddress: '123 Street Circle',
        phoneNumber: '1-800-FRIED'
      });
      await Biz.remove(2);

      const newList = await db('businesses');

      expect(newList[1].username).toBe('biz3')
      expect(newList[1].id).not.toBe(2)
    })
  })
});
