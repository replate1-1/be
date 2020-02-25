const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

//middleware and routers

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

//server.use router connections

server.get('/', (req, res) => {
  res.status(200).json({ message: "Server up and running!"})
});

module.exports = server;