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
        })
    }catch(error){
        res.status(400).json({
            //!error.message is used to get the error message from mongoose
            error: 'unable to create task'
        })
    }
}



//exporting section
module.exports = {
    createNewTask
}