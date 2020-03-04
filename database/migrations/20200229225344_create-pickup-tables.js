
exports.up = function(knex) {
  return knex.schema
    .createTable('facilities', tbl => {
      tbl.increments();
      tbl.string('facilityName').notNullable();
      tbl.string('facilityAddress')
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
      tbl.integer('businessId')
        .notNullable()
        .unsigned()
        .references('businesses.id')
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
};

exports.down = function(knex) {
  return knex.schema  
    .dropTableIfExists('driver-pickups')
    .dropTableIfExists('business-pickpus')
    .dropTableIfExists('pickups')
    .dropTableIfExists('facilities');
};
