//importing models
const User = require('../models/User');


//logic section

//creating new user
const createUser = async (req, res, next) => {
    const user = new User(req.body);
    try{
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).json({
            user,
            token
        });
    }catch(error){
        //proper error object will be made in userErrorHandler
        next(error);
    }
}

//login user for getting assigned by new token
const loginUser = async (req, res, next) => {
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.status(200).json({
            user,
            token
        });
    }catch(err){
        const error = {
            message: err.message,
            status: 401
        }
        next(error);
    }
}

const logOutUser = async (req, res, next) => {
    try{     
        req.user.tokens.filter(token => token !== req.token);
        delete req.token;
        await req.user.save();
        res.status(200).json({
            message: 'user has been logged out successfully'
        })
    }catch(err){
        const error = {
            message: 'unable to logout',
            status: 500,
        }
        next(error);
    }
}

//serving user's profie data
const getUserProfile = (req, res, next) => {
    try{ 
        res.status(200).json({
            userProfile: req.user
        });
    }catch(err){
        const error = {
            message: 'unable to get user profile',
            status: 500
        }
        next(error);
    }
};

//patching user's profile data
const patchUser = async (req, res, next) => {
    const allowedToUpdate = ['email', 'password', 'userName'];
    const updatingCase = Object.keys(req.body);
    const validUpdate = updatingCase.every(field => allowedToUpdate.includes(field));
    try{
        if(!validUpdate){
            throw new Error('Invalid update field');
        }
    
        updatingCase.forEach(field => {
            req.user[field] = req.body[field];
        })
    
        await req.user.save();
    
        res.status(200).json({
            message: 'user has been updated successfully'
        });

    }catch(err){
        const error = {
            message: err.message,
            status: 400
        }
        next(error);
    }
}

//exporting section 
module.exports = {
    createUser,
    loginUser,
    logOutUser,
    getUserProfile,
    patchUser
}