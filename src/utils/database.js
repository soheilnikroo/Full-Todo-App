//third-party packages and libs
const mongoose = require('mongoose');

//database connector function
const dataBaseConnector = async (server, port) => {
    try{
        await mongoose.connect(process.env.DB_URI, {useNewUrlParser: true});
        server.listen(port, () => console.log(`server is alive at port ${port}`));
    }catch(err){
        console.log(err);
    };
};

//exporting section
module.exports = dataBaseConnector;