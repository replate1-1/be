const knexCleaner = require('knex-cleaner');

exports.seed = function(knex) {
  
  return knexCleaner.clean(knex, {
    ignoreTables: ["migrations", "migrations_lock"]
  });
    
};
