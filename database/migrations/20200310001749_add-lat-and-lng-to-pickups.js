
exports.up = function(knex) {
  return knex.schema.table('pickups', tbl => {
    tbl.float('lat');
    tbl.float('lng');
  })
};

exports.down = function(knex) {
  return knex.schema.table('pickups', tbl => {
    tbl.dropColumn('lng')
    tbl.dropColumn('lat');
  })
};
