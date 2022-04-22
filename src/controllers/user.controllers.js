//importing models
const User = require('../models/User');

//logic section

//creating new user
const createUser = async (req, res) => {
    const user = new User(req.body);
    try{
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).json({
            user,
            token
        });
    }catch(error){
        console.log(error);
        res.status(400).json();
    }
}

//login user for getting assigned by new token
const loginUser = async (req, res) => {
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.status(200).json({
            user,
            token
        });
    }catch(error){
        res.status(401).json({
            error: error.message
        })
    }
}

const logOutUser = async (req, res) => {
    try{     
        req.user.tokens.filter(token => token !== req.token);
        delete req.token;
        await req.user.save();
        res.status(200).json({
            message: 'user has been logged out successfully'
        })
    }catch(error){
        res.status(500).json({
            error: 'unable to logout now!'
        })
    }
}


//exporting section 
module.exports = {
    createUser,
    loginUser,
    logOutUser
}