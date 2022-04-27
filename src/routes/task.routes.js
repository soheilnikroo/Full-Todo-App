//third-party packages and libs
const router = require('express').Router();

//importing authentication middleware
const authentication = require('../middlewares/authentication');

//importing task controllers
const taskControllers = require('../controllers/task.controllers');

//routing section

//creating new task 
router.post('/tasks', authentication, taskControllers.createNewTask);


//exporting section
module.exports = router;