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
            const error = {
                message: 'task not found',
                status: 404
            }
            return next(error)
        }

        res.status(200).json({
            success: 'task deleted successfully'
        })
    }catch(err){
        const error = {
            message: err.message,
            status: 500
        }
        next(error);
    }
}

//fetching all tasks for a authenticated user
const fetchTasks = async (req, res, next) => {
    const match = {}

    if(req.query.isDone){
        match.isDone = req.query.isDone === 'true';
    }

    try{
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
            }
        });

        if(req.user.tasks.length === 0){
            return res.status(200).json([]);
        }

        const publicTasks = req.user.tasks.map(Task.publicInfo);
        const taskQuantity = publicTasks.length;
        
        //correcting task index before each fetch
        for(let ind = 1; ind <= taskQuantity; ind++){
            publicTasks[ind - 1].index = ind;
        }

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

//path task basedon task id
const patchTask = async (req, res, next) => {
    const allowedUpdates = ['title', 'description', 'isDone'];
    const updates = Object.keys(req.body);

    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if(!isValidOperation){
        const error = {
            message: 'invalid update',
            status: 400
        }

        return next(error);
    }

    try{
        const task = await Task.findOne({_id: req.params._id, owner: req.user._id});

        if(!task) {
            const error = {
                message: 'task not found',
                status: 404
            }

            return next(error);
        }

        updates.forEach(update => task[update] = req.body[update]);

        await task.save();

        res.status(200).json({
            task
        });
    }catch(err){
        const error = {
            message: err.message,
            status: 500
        }

        next(error);
    }
}

//sorting tasks index base on reordering them in client side
const reorderTaskIndex = async (req, res, next) => {
    const {destinationIndex, _id} = req.body;
    try{
        const task = await Task.findOne({_id, owner: req.user._id});
        const originIndex = task.index;
        if(destinationIndex < originIndex){
            await Task.updateMany({
                index: {
                    $gte: destinationIndex, 
                    $lt: originIndex
                }
            }, {
                $inc: {
                    index: 1
                }
            })
            
            task.index = destinationIndex;

            await Task.updateOne({
                _id, 
                owner: req.user._id
            },{
                index: destinationIndex
            })

            res.status(200).json({
                message: 'tasks are reordered successfully'
            })
        }else if(originIndex < destinationIndex){
            await Task.updateMany({
                index: {
                    $gt: originIndex, 
                    $lte: destinationIndex
                }
            }, {
                $inc: {
                    index: -1
                }
            })

            task.index = destinationIndex;

            await Task.updateOne({
                _id, 
                owner: req.user._id
            },{
                index: destinationIndex
            })

            res.status(200).json({
                message: 'tasks are reordered successfully'
            })
        }
    }catch(err){
        res.status(500).json({
            error: err.message
        })
    }
}

//exporting section
module.exports = {
    createNewTask,
    deleteTask,
    fetchTasks,
    patchTask,
    reorderTaskIndex
}