//importing Task model
const Task = require('../models/Task');

//logic section 

//creating new task
const createNewTask = async (req, res) => {
    const task = new Task(req.body);
    task.owner = req.user._id;
    try{
        await task.save();
        res.status(201).json({
            success: 'task created successfully',
            task
        })
    }catch(error){
        res.status(400).json({
            //!error.message is used to get the error message from mongoose
            error: 'unable to create task'
        })
    }
}

//deleting existing task
const deleteTask = async (req, res) => {
    const taskId = req.params._id;
    try{
        const task = await Task.findOneAndRemove({_id: taskId, owner: req.user._id});

        if(!task){
            return res.status(404).json({
                error: 'task not found'
            })
        }

        res.status(200).json({
            success: 'task deleted successfully'
        })
    }catch(error){
        res.status(500).json({
            error: 'unable to delete task right now, try again later!'
        })
    }
}

//exporting section
module.exports = {
    createNewTask,
    deleteTask
}