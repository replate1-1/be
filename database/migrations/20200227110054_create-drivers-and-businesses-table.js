
exports.up = function(knex) {
  return knex.schema
    .createTable('drivers', tbl => {
      tbl.increments();
      tbl.string('username')
        .notNullable()
        .unique();
      tbl.string('email')
        .notNullable()
        .unique();
      tbl.string('password').notNullable();
      tbl.string('volunteerName').notNullable();
      tbl.string('phoneNumber')
        .notNullable()
        .unique();
    })
    
    .createTable('businesses', tbl => {
      tbl.increments();
      tbl.string('username')
        .notNullable()
        .unique();
      tbl.string('email')
        .notNullable()
        .unique();
      tbl.string('password').notNullable();
      tbl.string('businessName').notNullable();
      tbl.string('businessAddress').notNullable();
      tbl.string('phoneNumber')
        .notNullable()
        .unique();
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropIfTableExists('businesses')
    .dropIfTableExists('drivers');
};
