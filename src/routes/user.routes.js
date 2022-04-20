//third party-packages and libs
const router = require('express').Router();

//importing user controller 
const userControllers = require('../controllers/user.controllers');

//creating new user
router.post('/users/signup', userControllers.createUser);




//exporting section
module.exports = router;