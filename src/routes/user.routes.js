//third party-packages and libs
const router = require('express').Router();

//importing authentication middleware
const authentication = require('../middlewares/authentication');

//importing error login handlers
const userErrorHandlers = require('../errors/user.errors');

//importing user controllers
const userControllers = require('../controllers/user.controllers');

//creating new user
router.post('/users/signup', userControllers.createUser, userErrorHandlers.creatingUserErrorHandler);

//login user for getting assigned by new token
router.post('/users/login', userControllers.loginUser, userErrorHandlers.loginErrorHandler); 

//logout user
router.post('/users/me/logout', authentication, userControllers.logOutUser, userErrorHandlers.logOutErrorHandler);

//serving user's profie data
router.get('/users/me/profile', authentication, userControllers.getUserProfile, userErrorHandlers.getUserProfileErrorHandler);

//patching user's profile data
router.patch('/users/me/update', authentication, userControllers.patchUser, userErrorHandlers.patchUserProfileErrorHandler);

//exporting section
module.exports = router;  