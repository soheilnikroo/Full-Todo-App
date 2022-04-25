//third-party packages and libs 
const express = require('express');
const cors = require('corse');

//app and database configurations
const app = express();

//applying middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

//importing section for routers  
const userRouters = require('./routes/user.routes');


//applying routers
app.use('/api', userRouters);


//exporting section
module.exports = app
