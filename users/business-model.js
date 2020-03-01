const db = require('../database/dbConfig.js');

function find() {
  return db('businesses')
    .select(
      'username',
      'email',
      'businessName',
      'businessAddress',
      'phoneNumber'
    )
}

function findFacilities() {
  return db('facilities');
}

function findBy(filter) {
  return db('businesses').where(filter).first();
}

function findById(id) {
  return db('businesses').where({ id }).first();
}

async function add(business) {
  const [id] = await db('businesses').insert(business);
  return findById(id);
}

function remove(id) {
  return db('businesses')
    .where('id', id)
    .del();
}

module.exports = {
  add,
  find,
  findBy,
  findById,
  findFacilities,
  remove
}
