//third party-packages and libs
const router = require('express').Router();

//importing  middlewares
const authentication = require('../middlewares/authentication');
const uploadFile = require('../middlewares/avatar');

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

//saving new avatar for user profile
router.post('/users/me/avatar', authentication, uploadFile.single('avatar'),  userControllers.saveNewAvatar, userErrorHandlers.saveAvatarErrorHandler);

//deleting avatar from user account
router.delete('/users/me/avatar', authentication, userControllers.deleteExistingAvatar, userErrorHandlers.deleteExistingAvatarErrorHandler);

//get avatar for user profile
router.get('/users/me/avatar', authentication, userControllers.getAvatar, userErrorHandlers.getUserProfileErrorHandler);

//exporting section
module.exports = router;  