//third-party packages and libs 
const express = require('express');


//app and database configurations
const app = express();

//applying middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));


//importing section for routers  
const userRouters = require('./routes/user.routes');
const taskRouters = require('./routes/task.routes');


//applying routers
app.use('/api', userRouters);
app.use('/api', taskRouters);

//exporting section
module.exports = app
