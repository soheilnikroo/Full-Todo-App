//third-party packages and libs 
const mongoose = require('mongoose');

//importing app 
const server = require('./app');


//server and database configurations
const port = process.env.PORT; 
const DBUri = process.env.DB_URI;


//setting server and database alive
mongoose.connect(DBUri, {
    useNewUrlParser: true
})
    .then(() => {server.listen(port, () => console.log(`server is alive at port ${port}`))})
    .catch(error => {console.log(error)});
