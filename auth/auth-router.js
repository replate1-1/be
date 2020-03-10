const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('./secrets.js');
const Drivers = require('../users/driver-model.js');
const Businesses = require('../users/business-model.js');
const mware = require('./middleware.js');

function genToken(user) {
   
  const payload = {
    userId: user.id,
    username: user.username
  };

  const options = {
    expiresIn: '12h'
  };

  return token = jwt.sign(payload, secrets.jwtSecret, options);
}

router.post('/login/driver', (req, res) => {

  let { username, password  } = req.body;

  Drivers.findBy({ username })
    .first()
    .then(driver => {
      if(driver && bcrypt.compareSync(password, driver.password)) {
        const token = genToken(driver);
        res.status(200).json({
          message: `Welcome back, ${driver.username}`,
          token
        });
      }else {
        res.status(401).json({ message: "invalid login" })
      }
    })
    .catch(err => {
      res.status(500).json({
        message: "there was an error logging you in, please try again",
        error: err
      });
    });
});

router.post('/login/business', (req, res) => {

  let { username, password  } = req.body;

  Businesses.findBy({ username })
    .first()
    .then(business => {
      if(business && bcrypt.compareSync(password, business.password)) {
        const token = genToken(business);
        res.status(200).json({
          message: `Welcome back, ${business.username}`,
          token
        });
      }else {
        res.status(401).json({ message: "invalid login" })
      }
    })
    .catch(err => {
      res.status(500).json({
        message: "there was an error logging you in, please try again",
        error: err
      });
    });
});
//TODO: not dry...refactor with dynamic with url tags...req.params?

router.get('/drivers', mware.restricted, (req, res) => { //all

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

router.get('/businesses', mware.restricted, (req, res) => {
  Businesses.find()
    .then(businesses => {
      res.json(businesses);
    })
    .catch(err => {
      res.status(500).json({
        message: "Failed to retrieve businesses",
        error: err
      });
    });
});

//not protected, can be accessed by anyone. Helpful center information.
router.get('/facilities', (req, res) => {
  Businesses.findFacilities()
    .then(facilities => {
      res.json(facilities);
    })
    .catch(err => {
      res.status(500).json({
        message: "Failed to retrieve facilities",
        error: err
      });
    });
});

module.exports = router;