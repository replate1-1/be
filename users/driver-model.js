const db = require('../database/dbConfig.js');

function find() {
  return db('drivers')
    .select(
      'id',
      'username',
      'email',
      'volunteerName AS name',
      'phoneNumber'
    );  
  
}

function findBy(filter) {
  return db('drivers')
    .where(filter)
    .first();
}

function findById(id) {
  return db('drivers')
    .where({ id })
    .first();
}

async function add(driver) {
  const [id] = await db('drivers').insert(driver, "id");
  return findById(id);
}

function remove(id) {
  return db('drivers')
    .where('id', id)
    .del();
}

module.exports = {
  add,
  find,
  findBy,
  findById,
  remove
}
