
exports.up = function(knex) {
  
  return knex.schema
    .createTable('sessions', tbl => {
      tbl.increments('SID', 225);
      tbl.json('sess').notNullable();
      tbl.datetime('expired').notNullable();
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('sessions');
};
