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

function addPickup(pickup) {
  const [id] = await db('pickups').insert(pickup);
  return findPickupById(id);
}

function removePickup(id) {
  return db('pickups')
    .where('id', id)
    .del();
}

module.exports = {
  findPickups,
  findPickupById,
  addPickup,
  removePickup
}
