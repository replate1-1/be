const db = require('../database/dbConfig.js');

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

module.exports = {
  add,
  findBy,
  findById
}

//I'm not sure if I should make the function names more specific for readability (ex: addDriver)