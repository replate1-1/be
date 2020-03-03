const db = require('../database/dbConfig.js');

//for the functionality of auto adding the data to business-pickups and driver-pickups tables, let's see if I can add an additional insert along with the insert of the main pickup data.

//also...for the driver pickup insert...wouldn't it make more sense to just add the id of the existing pickup so the row wouldn't have to be created twice? It's the same data and it's already been created by the business...plus this way there's less room for error. Even though it's just for the sake of listing what the driver has to drop off. I dunno. I'll do both and present it to the team.

//these functions are for the use of the businesses to add and remove the data from 

function findPickups() {
  return db('pickups');
}

function findPickupById(id) {
  return db('pickups')
    .where({ id })
    .first();
}

async function addPickup(pickup) {
  const [id] = await db('pickups').insert(pickup);
  return findPickupById(id);
}

function removePickup(id) {
  return db('pickups')
    .where('id', id)
    .del();
}

function removeDriverPickup(pickupId) {
  return db('driver-pickups')
    .where('pickupId', pickupId)
    .del();
}

//functions for the purpose of driver usertypes to add existing pickups to their list of accepted dropoffs. 

//join tables combining a driverId with existing pickupId...

async function addExistingPickup(bridge) {
  
  return db('driver-pickups').insert(bridge);
}

//!Write another one of these to go directly into the business add pickups function.

function findAcceptedPickups(driverId) {
  return db('driver-pickups')
    .join('pickups', 'pickups.id', 'driver-pickups.pickupId')
    .join('facilities', 'facilities.id', 'pickups.dropOffId')
    .select(
      'driver-pickups.driverId',
      'pickups.food',
      'pickups.amount',
      'pickups.description',
      'pickups.pickUpTime',
      'facilities.facilityName AS dropOffName',
      'facilities.facilityAddress AS dropOffLocation'
    );

    //not sure if the dropoff location is going to work because the join is referencing another table that we're joining...but we'll see.

    {/**
    .select(
      driverId,
      'pickups.food',
      'pickups.amount',
      'pickups.description',
      'pickups.pickUpTime',
      'facilities.facilityAddress AS dropOffLocation'
    )
    .from()
    */}
}

module.exports = {
  findPickups,
  findPickupById,
  addPickup,
  removePickup,
  removeDriverPickup,
  addExistingPickup,
  findAcceptedPickups
}
