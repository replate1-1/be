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
    })

    .createTable('facilities', tbl => {
      tbl.increments();
      tbl.string('facilityName').notNullable();
      tbl.string('facilityAddress')
        .notNullable()
        .unique();
      tbl.string('phoneNumber')
        .notNullable()
        .unique();
    })

    .createTable('pickups', tbl => {
      tbl.increments();
      tbl.string('food', 250).notNullable();
      tbl.integer('amount').notNullable();
      tbl.string('description', 700);
      tbl.date('pickupTime');
      tbl.integer('dropOffId')
        .unsigned()
        .references('facilities.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    })

    .createTable('business-pickups', tbl => {
      tbl.string('businessUsername')
        .notNullable()
        .unsigned()
        .references('businesses.username')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      tbl.integer('pickupId')
        .notNullable()
        .unsigned()
        .references('pickups.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      tbl.boolean('received').defaultTo(false);
    })

    .createTable('driver-pickups', tbl => {
      tbl.integer('driverId')
        .notNullable()
        .unsigned()
        .references('drivers.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      tbl.integer('pickupId')
        .notNullable()
        .unsigned()
        .references('pickups.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      tbl.boolean('delivered').defaultTo(false);
    })

    .createTable('sessions', tbl => {
      tbl.string('sid', 255)
        .primary()
        .notNullable();
      tbl.json('sess').notNullable()
      tbl.datetime('expired').notNullable();
    });
};

exports.down = function(knex) {
  return knex.schema  
    .dropTableIfExists('sessions')
    .dropTableIfExists('driver-pickups')
    .dropTableIfExists('business-pickups')
    .dropTableIfExists('pickups')
    .dropTableIfExists('facilities')
    .dropTableIfExists('businesses')
    .dropTableIfExists('drivers');
};
