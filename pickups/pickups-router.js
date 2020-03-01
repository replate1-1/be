const router = require('express').Router();
const mware = require('../auth/middleware.js');
const Pickups = require('./pickups-model.js');

router.get('/')
