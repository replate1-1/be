const router = require('express').Router();
const Users = require('./user-model.js');
const bcrypt = require('bcryptjs');
const Drivers = require('./driver-model.js');
const Businesses = require('./business-model.js');
//code here to return a list of users just in case that's needed??

//TODO: add restritced middleware here later

// POST - /user/driver register
router.post('/driver', (req, res) => {
  
  let driver = req.body;

  const hash = bcrypt.hashSync(driver.password, 10);
  driver.password = hash;

  Drivers.add(driver)
    .then(newDriver => {
      res.status(201).json(newDriver);
    })
    .catch(err => {
      res.status(500).json({
        message: "There was an issue adding new driver",
        error: err
      });
    });
});

// POST - /user/business register
router.post('/business', (req, res) => {
  
  let business = req.body;

  const hash = bcrypt.hashSync(business.password, 10);
  business.password = hash;

  Businesses.add(business)
    .then(newBusiness => {
      res.status(201).json(newBusiness);
    })
    .catch(err => {
      res.status(500).json({
        message: "There was an issue adding new business",
        error: err
      });
    });
});

//login located in auth/auth-router

//GET all drivers
router.get('/drivers', (req, res) => {
  Drivers.find()
    .then(drivers => {
      res.json(drivers);
    })
    .catch(err => {
      res.status(500).json({
        message: "Failed to retrieve drivers",
        error: err
      });
    });
});



module.exports = router;
