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

//TODO: transfer endpoints over to api-router...first re-write tests to run with that file instead of this one. Maybe we won't have to once the server is hooked up to the api-router because it will automatically redirect all requests to it? I'll have to see.