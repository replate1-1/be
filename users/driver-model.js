const db = require('../database/dbConfig.js');

function find() {
  return db('drivers')
    .select(
      'username',
      'email',
      'volunteerName AS name',
      'phoneNumber'
    );  
  
}

function findBy(filter) {
  return db('drivers').where(filter).first();
}

function findById(id) {
  return db('drivers').where({ id }).first();
}

async function add(driver) {
  const [id] = await db('drivers').insert(driver);
  return findById(id);
}

module.exports = {
  add,
  find,
  findBy,
  findById
}

//I'm not sure if I should make the function names more specific for readability (ex: addDriver)