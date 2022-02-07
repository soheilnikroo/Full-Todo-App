//third party packages and libraries
import express from 'express';

//server configuration
const server = express();
const port = Number(process.env.PORT) || 5000;
const hostName = process.env.SERVER_HOST || '127.0.0.1';

//data parsers section
server.use(express.json());
server.use(express.urlencoded({extended: true}));

//server listener
server.listen(port, hostName, () => console.log(`server is up on http://${hostName}:${port}`));