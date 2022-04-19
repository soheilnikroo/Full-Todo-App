//importing models
const User = require('../models/User');

//logic section

//creating new user
const createUser = async (req, res) => {
    try{
        const user = new User(req.body);
        await user.save();
        res.status(201).json(user);
    }catch(error){
        console.log(error);
        res.status(400).json();
    }
}


//exporting section 
module.exports = {
    createUser
}