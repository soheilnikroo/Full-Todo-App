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

//fetching all tasks for a authenticated user
router.get('/tasks', authentication, taskControllers.fetchTasks, taskErrorHandler.fetchTasksErrorHandler);

//path task basedon task id
router.patch('/tasks/:_id', authentication, taskControllers.patchTask, taskErrorHandler.patchTaskErrorHandler);

//sorting tasks index base on reordering them in client side
router.post('/tasks/sortIndex', authentication, taskControllers.reorderTaskIndex);

//exporting section
module.exports = router;