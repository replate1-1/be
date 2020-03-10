exports.up = function(knex) {
  return knex.schema.table('facilities', tbl => {
    tbl.float('lat');
    tbl.float('lng');
  })
};

exports.down = function(knex) {
  return knex.schema.table('facilities', tbl => {
    tbl.dropColumn('lng')
    tbl.dropColumn('lat');
  })
};
