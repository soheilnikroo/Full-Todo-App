//importing app and database connector
const server = require('./app');
const dataBaseConnector = require('./utils/database');

//server and database configurations
const port = process.env.PORT; 

//stablishing database connection and server listener
dataBaseConnector(server, port);
