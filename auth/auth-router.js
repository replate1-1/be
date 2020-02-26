const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = reauire('jsonwebtoken');
const secrets = require('./secrets.js');
const Users = require('../users/user-model.js');

function genToken(user) {
   
  const payload = {
    userId: user.id,
    username: user.username
  };

  const options = {
    expiresIn: '4h'
  };

  const token = jwt.sign(payload, secrets.jwtSecret, options);
}

module.exports = router;