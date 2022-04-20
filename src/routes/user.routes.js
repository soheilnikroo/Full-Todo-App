//third party-packages and libs
const router = require('express').Router();

//importing user controller 
const userControllers = require('../controllers/user.controllers');

//creating new user
router.post('/users/signup', userControllers.createUser);

//login user for getting assigned by new token
router.post('/users/login', userControllers.loginUser); 


//exporting section
module.exports = router; 