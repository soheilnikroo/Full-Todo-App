//third-party packages and libs
const sharp = require('sharp');
const fs = require('fs');

//importing models and utils
const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');

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
        sendEmail(user.email, user.userName);
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
            const error = {
                message: 'invalid update',
                status: 400
            }
            return next(error);
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
            status: 500
        }
        next(error);
    }
}

//saving new avatar for user profile
const saveNewAvatar = async (req, res, next) => {
    try{
        const buffer = await sharp(req.file.buffer).resize({width: 250, height: 250}).png().toBuffer();
        req.user.imageUrl = buffer;
        await req.user.save();
        res.status(200).json({
            message: 'avatar has been saved successfully'
        });
    }catch(err){
        const error = {
            message: err.message,
            status: 400
        }
        next(error);
    }
}

//deleting avatar from user account
const deleteExistingAvatar = async (req, res, next) => {
    try{
        req.user.imageUrl = undefined;
        await req.user.save();
        res.status(200).json({
            message: 'avatar has been deleted successfully'
        });
    }catch(err){
        const error = {
            message: err.message,
            status: 400
        }
        next(error);
    }
};

//get avatar for user profile
const getAvatar = async (req, res, next) => {
    try{
        if(!req.user.imageUrl){
            const error = {
                message: 'there is no avatar',
                status: 200
            }
            return next(error);
        }
        res.set('Content-Type', 'image/png');
        res.send(req.user.imageUrl);
    }catch(err){    
        const error = {
            message: err.message,
            status: 500
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
    patchUser,
    saveNewAvatar,
    deleteExistingAvatar,
    getAvatar
}