
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('pickups').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('pickups').insert([
        {
          food: "french bread",
          amount: 20,
          description: "1 day old loaves, not stale. Will keep for 3 more days.",
          pickupTime: "03-02-2020",
          dropOffId: 1
        }
      ]);
    });
};
