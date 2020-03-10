const db = require('../database/dbConfig.js');

function findPickups() {
  return db('pickups');
}

function findPickupById(id) {
  return db('pickups')
    .where({ id })
    .first();
}

function findBusinessPickups(businessUsername) {
  return db('pickups')
    .where({ businessUsername })
}

async function addPickup(pickup) {
  const [id] = await db('pickups').insert(pickup, "id");
  return findPickupById(id);
}

function removePickup(id) {
  return db('pickups')
    .where('id', id)
    .del();
}

//PUT biz pickup
function updatePickup(changes, id) {
  return db('pickups')
    .where({ id })
    .first()
    .update(changes);
    //.then() for getById to return the newly updated record?
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
    //.join('facilities', 'facilities.id', 'pickups.dropOffId')
    .select(
      'driver-pickups.driverId',
      // 'pickups.food',
      // 'pickups.amount',
      // 'pickups.description',
      // 'pickups.date',
      // 'pickups.time',
      'pickups.*',
      //'facilities.facilityName AS dropOffName',
      //'facilities.facilityAddress AS dropOffLocation'
    )
    .where({ driverId });

}

module.exports = {
  findPickups,
  findPickupById,
  addPickup,
  removePickup,
  removeDriverPickup,
  addExistingPickup,
  findAcceptedPickups,
  findBusinessPickups,
  updatePickup
}
