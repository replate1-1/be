const router = require('express').Router();
const Users = require('./user-model.js');
const bcrypt = require('bcryptjs');
const Drivers = require('./driver-model.js');
const Businesses = require('./business-model.js');
//code here to return a list of users just in case that's needed??

//TODO: add restritced middleware here later
router.get('/', (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

// POST - /user/driver register
// router.post('/driver', (req, res) => {
  
//   let driver = req.body;

//   const hash = bcrypt.ha
// })

// POST - /user/business register

//POST - login(email and password)

module.exports = router;
