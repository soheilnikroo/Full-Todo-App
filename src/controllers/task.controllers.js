//importing Task model
const Task = require('../models/Task');

//logic section 

//creating new task
const createNewTask = async (req, res, next) => {
    const task = new Task(req.body);
    task.owner = req.user._id;
    try{
        await task.save();
        res.status(201).json({
            success: 'task created successfully',
            task
        })
    }catch(err){
        //proper error object will be created in error handler middleware
        next(err)
    }
}

//deleting existing task
const deleteTask = async (req, res, next) => {
    const taskId = req.params._id;
    try{
        const task = await Task.findOneAndRemove({_id: taskId, owner: req.user._id});

        if(!task){
            // return res.status(404).json({
            //     error: 'task not found'
            // })
            throw new Error('task not found');
        }

        res.status(200).json({
            success: 'task deleted successfully'
        })
    }catch(error){
        next(error);
    }
}

//fetching all tasks for a authenticated user
const fetchTasks = async (req, res, next) => {
    try{
        await req.user.populate({
            path: 'tasks'
        });

        if(req.user.tasks.length === 0){
            console.log('flag');
            const error = {
                message: 'no tasks found',
                status: 404
            }
            return next(error);
        }

        const publicTasks = req.user.tasks.map(Task.publicInfo);

        res.status(200).json({
            tasks: publicTasks
        })
    }catch(err){
        const error = {
            message: err.message,
            status: 500,
        }
        next(error);
    }
}

//exporting section
module.exports = {
    createNewTask,
    deleteTask,
    fetchTasks
}