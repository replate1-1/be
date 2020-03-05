const jwt = require('jsonwebtoken');
const secrets = require('./secrets.js');
//TODO: find a way to make these dynamic to keep DRY.


function validateDriverUsername(req, res, next) {
  
  const { username } = req.params;
  db = require('../users/driver-model.js');

  db.findBy({ username })
    .then(user => {
      if(user) {
        next();
      }else {
        res.status(404).json({
          message: "A driver with this username could not be found."
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        message: "There was an issue searching for username."
      })
    })
}

function validateBusinessUsername(req, res, next) {
  
  const { username } = req.params;
  db = require('../users/business-model.js');

  db.findBy({ username })
    .then(user => {
      if(user) {
        next();
      }else {
        res.status(404).json({
          message: "A business with this username could not be found."
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        message: "There was an issue searching for username."
      })
    })
}

function validateDriverId(req, res, next) {

  const { id } = req.params;
  db = require('../users/driver-model');

  db.findById(id)
    .then(user => {
      if(user) {
        req.user = user;
        console.log('user found!', user);
        next();
      }else {
        res.status(404).json({
          message: "A user with this id could not be found."
        })
      }
    })
    .catch(err => {
      res.status(500).json({
        message: "There was an issuse searching for user id."
      });
    });
}

function validateBusinessId(req, res, next) {

  const { id } = req.params;

  db = require('../users/business-model');

  db.findById(id)
    .then(user => {
      if(user) {
        req.user = user;
        console.log('user found!', user);
        next();
      }else {
        res.status(404).json({
          message: "A user with this id could not be found."
        })
      }
    })
    .catch(err => {
      res.status(500).json({
        message: "There was an issuse searching for user id."
      });
    });
}

function restricted(req, res, next) {

  const token = req.headers.authorization;

  if(req.decodedJwt) {
    next();
  }else if(token) {
    jwt.verify(token, secrets.jwtSecret, (err, decodedJwt) => {
      if(err) {
        res.status(401).json({ message: "Sorry, there was an issue accessing this page" });
      }else {
        req.decodedJwt = decodedJwt;
        next();
      }
    })
  }else {
    res.status(401).json({ message: "Please log in."});
  }
};

module.exports = {
  validateDriverUsername,
  validateBusinessUsername,
  validateDriverId,
  validateBusinessId,
  restricted
}