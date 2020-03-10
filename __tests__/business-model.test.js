const db = require('../database/dbConfig.js');
const Biz = require('../users/business-model.js');

beforeEach(async () => {
  await db('businesses').truncate();
});

//POST business user
describe('business user queries', () => {
  
  describe('POST new business user', () => {
    it('adds a new business to the db', async () => {

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
    })
  })
});