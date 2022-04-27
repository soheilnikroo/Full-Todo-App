//third party-packages and libs
const router = require('express').Router();

//importing authentication middleware
const authentication = require('../middlewares/authentication');

//importing error login handler
const loginErrorHandler = require('../errors/loginErrorHandler');

//importing user controller 
const userControllers = require('../controllers/user.controllers');

//creating new user
router.post('/users/signup', userControllers.createUser);

//login user for getting assigned by new token
router.post('/users/login', userControllers.loginUser, loginErrorHandler); 

//logout user
router.post('/users/me/logout', authentication, userControllers.logOutUser);

//serving user's profie data
router.get('/users/me/profile', authentication, userControllers.getUserProfile);

//patching user's profile data
router.patch('/users/me/update', authentication, userControllers.patchUser);

//exporting section
module.exports = router;  