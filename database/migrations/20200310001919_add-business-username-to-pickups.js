
exports.up = function(knex) {
  return knex.schema.table('pickups', tbl => {
    tbl.dropColumn('pickupTime');
    tbl.time('time');
    tbl.date('date');
  })
};

exports.down = function(knex) {
  return knex.schema.table('pickups', tbl => {
    tbl.dropColumn('date');
    tbl.dropColumn('time');
    tbl.date('pickupTime');
  })
};
