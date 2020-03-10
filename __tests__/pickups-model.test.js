const db = require('../database/dbConfig.js');
const Pickups = require('../pickups/pickups-model.js');

beforeEach(async () => {
  await db('pickups').truncate();
});

describe('pickups queries', () => {

  describe('POST new pickup', () => {
    it('adds a new pickup to the db in pickups table', async () => {
      await Pickups.addPickup({
        food: 'apples',
        amount: 55,
        description: 'golden delicious, will keep one month.',
        dropOffId: 2,
        lat: 12.3334,
        lng: -122.2222,
        businessUsername: 'business',
        time: '00:22:00',
        date: '2020-03-12'
      })
      
      const newPickup = await db('pickups')
      expect(newPickup).toHaveLength(1);
    })

    it('should return new pickup data', async () => {
      let pickup = await Pickups.addPickup({
        food: 'apples',
        amount: 55,
        description: 'golden delicious, will keep one month.',
        dropOffId: 2,
        lat: 12.3334,
        lng: -122.2222,
        businessUsername: 'business',
        time: '00:22:00',
        date: '2020-03-12'
      })
      expect(pickup.food).toBe('apples');
    })
  })
});
