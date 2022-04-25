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

//serving user's profie data
const getUserProfile = (req, res) => {
    res.status(200).json({
        userProfile: req.user
    });
};

//patching user's profile data
const patchUser = async (req, res) => {
    const allowedToUpdate = ['email', 'password', 'userName'];
    const updatingCase = Object.keys(req.body);
    const validUpdate = updatingCase.every(field => allowedToUpdate.includes(field));

    if(!validUpdate){
        return res.status(400).json({
            error: 'invalid update'
        });
    }

    updatingCase.forEach(field => {
        req.user[field] = req.body[field];
    })

    await req.user.save();

    res.status(200).json({
        message: 'user has been updated successfully'
    });

}

//exporting section 
module.exports = {
    createUser,
    loginUser,
    logOutUser,
    getUserProfile,
    patchUser
}