
exports.seed = function(knex) {
  
  return knex('facilities').delete()
    .then(function () {
      
      return knex('facilities').insert([
        {
          facilityName: "Martin de Porres House of Hospitality",
          facilityAddress: "225 Potero Ave, San Francisco, CA 94103",
          phoneNumber: "(415) 552-0240",
          lat: "37.766609",
          lng: "-122.407280"
        },
        {
          facilityName: "Mission Neighborhood Resource Center",
          facilityAddress: "165 Capp St, San Francisco, CA 94110",
          phoneNumber: "(415) 869-7977",
          lat: "37.764061",
          lng: "-122.418312"
        },
        {
          facilityName: "Navigation Center",
          facilityAddress: "1950 Mission St, San Francisco, CA 94103",
          phoneNumber: "(415) 487-3301",
          lat: "37.765960",
          lng: "-122.420030"
        },
        {
          facilityName: "Sanctuary Shelter",
          facilityAddress: "201 8th St, San Francisco, CA 94103",
          phoneNumber: "(415) 487-3300",
          lat: "37.776370",
          lng: "-122.411000"
        },
        {
          facilityName: "Raphael House",
          facilityAddress: "1065 Sutter St, San Francisco, CA 94109",
          phoneNumber: "(415) 345-7200",
          lat: "37.787959",
          lng: "-122.417710"
        },
        {
          facilityName: "Compass Family Services",
          facilityAddress: "49 Powell St, San Francisco, CA 94102",
          phoneNumber: "(415) 644-0504",
          lat: "37.785239",
          lng: "-122.408091"
        },
      ]);
    });
};
