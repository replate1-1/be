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

  if(req.session && req.session.user) { //req.session.user needed?
    next();
  }else {
    res.status(401).json({
      message: "Please log in."
    });
  }
}
//this isn't properly functioning and I'm not sure if the logout function is working either...Find prob and fix!

module.exports = {
  validateDriverUsername,
  validateBusinessUsername,
  validateDriverId,
  validateBusinessId,
  restricted
}