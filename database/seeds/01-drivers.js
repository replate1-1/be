
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('drivers').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('drivers').insert([
        {
          username: "flyeagles",
          password: "pass",
          email: "eagles@email.com",
          volunteerName: "Mike W.",
          phoneNumber: "789-456-1233"
        }
      ]);
    });
};
