
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('businesses').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('businesses').insert([
        {
          username: "tsuzuki",
          email: "tsuzuki.roll@gmail.com",
          password: "freshfish101",
          businessName: "Live Sushi Bar",
          businessAddress: "2001 17th St, San Francisco, CA 94103",
          phoneNumber: "(415) 861-8610"
        }
      ]);
    });
};
