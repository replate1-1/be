const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('./secrets.js');
const Users = require('../users/user-model.js');
const Drivers = require('../users/driver-model.js');
const Businesses = require('../users/business-model.js');

// function genToken(user) {
   
//   const payload = {
//     userId: user.id,
//     username: user.username
//   };

//   const options = {
//     expiresIn: '4h'
//   };

//   const token = jwt.sign(payload, secrets.jwtSecret, options);
// }

// router.post('/register', (req, res) => {
  
//   let user = req.body;
//   const hash = bcrypt.hashSync(user.password, 10);
//   user.password = hash;

//   Users.add(user)
//     .then(newUser => {
//       res.status(201).json(newUser);
//     })
//     .catch(err => {
//       res.status(500).json({
//         message: "error adding new user",
//         error: err
//       });
//     });
// });

router.post('/login/driver', (req, res) => {

  let { username, password  } = req.body;

  Drivers.findBy({ username })
    .first()
    .then(driver => {
      if(driver && bcrypt.compareSync(password, driver.password)) {
        res.status(200).json({
          message: `Welcome back, ${driver.username}`
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
        res.status(200).json({
          message: `Welcome back, ${business.username}`
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

module.exports = router;