//!This file is no loger used, can be safely deleted. Write new tests.

const db = require('../database/dbConfig.js');

function findBy(filter) {
  return db('users').where(filter).first();
}

function findById(id) {
  return db('users').where({ id }).first();
}

async function add(user) {
  const [id] = await db('users').insert(user);
  return findById(id);
}

module.exports = {
  add,
  find,
  findBy,
  findById
}
