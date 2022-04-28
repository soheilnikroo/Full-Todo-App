//third-party packages and libs
const router = require('express').Router();

//importing authentication middleware
const authentication = require('../middlewares/authentication');

//importing task error handlers middlewares
const taskErrorHandler = require('../errors/task.errors');

//importing task controllers
const taskControllers = require('../controllers/task.controllers');

//routing section

//creating new task 
router.post('/tasks', authentication, taskControllers.createNewTask, taskErrorHandler.createNewTaskErrorHandler);

//deleting existing task
router.delete('/tasks/:_id', authentication, taskControllers.deleteTask, taskErrorHandler.deleteTaskErrorHandler);

//exporting section
module.exports = router;