/**
 * author: https://github.com/Simple-MAX
 * Praktil API - server.js
 */

// import your npm module here 
const http = require('http');

// import app
const app = require('./app');

// add the port to the system env
const port = process.env.PORT || 3000;

// create the server
const server = http.createServer(app);

// start the server
server.listen(port);