//third-party packages and libs 
const express = require('express');
const mongoose = require('mongoose');


//server and database configurations
const server = express();
const port = process.env.PORT;
const hostName = process.env.HOST_NAME; 
const DBUri = process.env.DB_URI;

//applying middlewares
server.use(express.json());
server.use(express.urlencoded({extended:true}));


//importing section for routers  
const userRouters = require('./routes/user.routes');


//applying routers
server.use(userRouters);


//setting server and database alive
mongoose.connect(DBUri, {
    useNewUrlParser: true
})
    .then(() => {server.listen(port, hostName, () => console.log(`server is alive at http://${hostName}:${port}`))})
    .catch(error => {console.log(error)});
