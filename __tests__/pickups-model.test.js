const db = require('../database/dbConfig.js');
const Pickups = require('../pickups/pickups-model.js');

beforeEach(async () => {
  await db('pickups').truncate();
});

describe('CREATE queries', () => {

  describe('POST new pickup (business)', () => {

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
      await Pickups.addPickup({
        food: 'rice',
        amount: 10,
        description: 'uncooked, brown',
        dropOffId: 3,
        lat: 12.3334,
        lng: -122.2222,
        businessUsername: 'business2',
        time: '00:22:00',
        date: '2020-03-12'
      })
      await Pickups.addPickup({
        food: 'chicken',
        amount: 3,
        description: 'Full, oven roasted.',
        dropOffId: 2,
        lat: 12.3334,
        lng: -122.2222,
        businessUsername: 'business',
        time: '00:22:00',
        date: '2020-03-12'
      })
      
      const pickups = await db('pickups');

      expect(pickups).toHaveLength(3);
    })

    it('should return new pickup data', async () => {

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

      const pickup = await db('pickups');

      expect(pickup[0].food).toBe('apples');
      expect(pickup[0].amount).toBe(55);
    })
  })

  describe('POST new driver accepted pickup', () => {

    it('adds existing pickup to driver-pickups bridge table', async () => {

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
      await Pickups.addPickup({
        food: 'rice',
        amount: 10,
        description: 'uncooked, brown',
        dropOffId: 3,
        lat: 12.3334,
        lng: -122.2222,
        businessUsername: 'business2',
        time: '00:22:00',
        date: '2020-03-12'
      })
      await Pickups.addPickup({
        food: 'chicken',
        amount: 3,
        description: 'Full, oven roasted.',
        dropOffId: 2,
        lat: 12.3334,
        lng: -122.2222,
        businessUsername: 'business',
        time: '00:22:00',
        date: '2020-03-12'
      })
  
      await Pickups.addExistingPickup({
        driverId: 1,
        pickupId: 2
      })
  
      const acceptedPickups = await db('driver-pickups');
      
      expect(acceptedPickups).toHaveLength(1);
      expect(acceptedPickups[0].driverId).toBe(1);
      expect(acceptedPickups[0].pickupId).toBe(2);
    })

  })
});

describe('READ queries', () => {

  describe('GET all pickups in db', () => {

    it('returns a list of all current pickups', async () => {

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
      await Pickups.addPickup({
        food: 'rice',
        amount: 10,
        description: 'uncooked, brown',
        dropOffId: 3,
        lat: 12.3334,
        lng: -122.2222,
        businessUsername: 'business2',
        time: '00:22:00',
        date: '2020-03-12'
      })
     
      const pickups = await Pickups.findPickups();
      
      expect(pickups).toHaveLength(2);
    })
  })

  describe('GET all pickups made by specific business, identified by business username', () => {

    it('returns all records by business', async () => {

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
      await Pickups.addPickup({
        food: 'rice',
        amount: 10,
        description: 'uncooked, brown',
        dropOffId: 3,
        lat: 12.3334,
        lng: -122.2222,
        businessUsername: 'business2',
        time: '00:22:00',
        date: '2020-03-12'
      })
      await Pickups.addPickup({
        food: 'chicken',
        amount: 3,
        description: 'Full, oven roasted.',
        dropOffId: 2,
        lat: 12.3334,
        lng: -122.2222,
        businessUsername: 'business',
        time: '00:22:00',
        date: '2020-03-12'
      })

      const businessPickups = await Pickups.findBusinessPickups('business');

      expect(businessPickups).toHaveLength(2);
      expect(businessPickups[1].food).toBe('chicken');
    })
  })

  describe('GET a list of all driver-accepted data', () => {

    it('returns the number of accpted pickups and the correct data', async () => {
      //add pickups
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
      await Pickups.addPickup({
        food: 'rice',
        amount: 10,
        description: 'uncooked, brown',
        dropOffId: 3,
        lat: 12.3334,
        lng: -122.2222,
        businessUsername: 'business2',
        time: '00:22:00',
        date: '2020-03-12' 
      })
      await Pickups.addPickup({
        food: 'chicken',
        amount: 3,
        description: 'Full, oven roasted.',
        dropOffId: 2,
        lat: 12.3334,
        lng: -122.2222,
        businessUsername: 'business',
        time: '00:22:00',
        date: '2020-03-12'
      })
      //accept driver pickups
      await Pickups.addExistingPickup({
        driverId: 1,
        pickupId: 1
      })
      await Pickups.addExistingPickup({
        driverId: 1,
        pickupId: 3
      })

      const driverPickups = await Pickups.findAcceptedPickups(1);
     
      expect(driverPickups).toHaveLength(2);
      expect(driverPickups[1].food).toBe('chicken');
    })
  })
});

describe('UPDATE queries', () => {

  describe('edit existing pickup', () => {

    it('edits specified pickups identified by pickup id', async () => {

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

      const changes = {
        food: 'oranges',
        amount: 54
      }

      await Pickups.updatePickup(changes, 1);

      const pickup = await Pickups.findPickups();

      expect(pickup[0].food).toBe('oranges');
      expect(pickup[0].food).not.toBe('apples');
      expect(pickup[0].amount).toBe(54);
      expect(pickup[0].amount).not.toBe(55);
    })
  })
})

describe('DELETE queries', () => {

  it('removes business pickup from pickups table', async () => {

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
    await Pickups.addPickup({
      food: 'rice',
      amount: 10,
      description: 'uncooked, brown',
      dropOffId: 3,
      lat: 12.3334,
      lng: -122.2222,
      businessUsername: 'business2',
      time: '00:22:00',
      date: '2020-03-12' 
    })
    await Pickups.addPickup({
      food: 'chicken',
      amount: 3,
      description: 'Full, oven roasted.',
      dropOffId: 2,
      lat: 12.3334,
      lng: -122.2222,
      businessUsername: 'business',
      time: '00:22:00',
      date: '2020-03-12'
    })

    await Pickups.removePickup(1);

    const newPickupList = await Pickups.findPickups();

    expect(newPickupList).toHaveLength(2);
    expect(newPickupList[0].food).toBe('rice');

  })

  it('removes driver accepted pickups from the driver-pickups table', async () => {

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

    await Pickups.addExistingPickup({
      driverId: 1,
      pickupId: 1
    })
    
    await Pickups.removeDriverPickup(1);
    
    const driverPickups = await Pickups.findAcceptedPickups(1);

    expect(driverPickups).toHaveLength(0);
    expect(driverPickups).not.toHaveLength(1);
  })
});
