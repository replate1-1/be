const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const server = express();
const session = require('express-session');
const knexSessionStore = require('connect-session-knex')(session);
const secrets = require('../auth/secrets.js');

//middleware and routers
const apiRouter = require('./api-router.js');


//session config -> sent to db
const sessionConfig = {
  name: "dRudman",
  secret: secrets.cookieSecret,
  cookie: {
    maxAge: 1000 * 60 * 20, //20 mins
    secure: false,
    httpOnly: true
  },
  resave: false,
  saveUninitialized: true,
  store: new knexSessionStore({
    knex: require('../database/dbConfig.js'),
    tablename: 'sessions',
    sidfieldname: 'SID',
    createtable: true,
    clearInterval: 1000 * 60 * 20 //20 mins
  })
};

server.get('/', (req, res) => {
  res.status(200).json({ message: "Server up and running!"})
});

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(session(sessionConfig));

//server.use router connections
server.use('/api', apiRouter);

module.exports = server;
