const router = require('express').Router();
const Users = require('./user-model.js');
const bcrypt = require('bcryptjs');
const Drivers = require('./driver-model.js');
const Businesses = require('./business-model.js');
const mware = require('../auth/middleware.js');
//code here to return a list of users just in case that's needed??

//TODO: add restritced middleware here later
//TODO: switch gen user GET requests to auth-router...makes for better endpoints.

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

//TODO: add middleware to validate usernames...db dynamic variable...props? 

//GET requests
router.get('/driver/:username', mware.validateDriverUsername, (req, res) => { //indv.

  const { username } = req.params;

  Drivers.findBy({ username })
    .then(driver => {
      if(driver) {
        res.json({
          username: driver.username,
          name: driver.volunteerName,
          phoneNumber: driver.phoneNumber
        });
      }else {
        res.status(404).json({
          message: "Sorry, no user with that username could be found."
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        message: "There was an issue getting user info.",
        error: err
      });
    });
});

router.get('/business/:username', mware.validateBusinessUsername, (req, res) => { //indv.

  const { username } = req.params;

  Businesses.findBy({ username })
    .then(business => {
      if(business) {
        res.json({
          username: business.username,
          address: business.businessAddress,
          name: business.businessName,
          phoneNumber: business.phoneNumber
        });
      }else {
        res.status(404).json({
          message: "Sorry, no user with that username could be found."
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        message: "There was an issue getting user info.",
        error: err
      });
    });
});

//DELETE req 
// ?- is there a way to make it so the code is dynamic in some way, wouldn't have to write the get and delete requests twice. Just swap in the url usertype.

router.delete('/drivers/:id', mware.validateDriverId, (req,res) => {

  const { id } = req.params;

  Drivers.remove(id)
    .then(driver => {
      res.status(200).json({
        message: "Driver account has been deleted."
      });
    })
    .catch(err => {
      res.status(500).json({
        message: "There was an issue deleting driver account.",
        error: err
      });
    });
});

router.delete('/businesses/:id', mware.validateBusinessId, (req,res) => {

  const { id } = req.params;

  Businesses.remove(id)
    .then(business => {
      res.status(200).json({
        message: "Business account has been deleted."
      });
    })
    .catch(err => {
      res.status(500).json({
        message: "There was an issue deleting business account.",
        error: err
      });
    });
});


module.exports = router;
