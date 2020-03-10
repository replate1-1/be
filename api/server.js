const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const server = express();

//middleware and routers
const apiRouter = require('./api-router.js');

server.get('/', (req, res) => {
  res.status(200).json({ message: "Server up and running!"})
});

server.use(helmet());
server.use(cors());
server.use(express.json());

//server.use router connections
server.use('/api', apiRouter);

module.exports = server;
