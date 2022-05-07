//handling create new task error
const createNewTaskErrorHandler = (error, req, res, next) => {
    res.status(400).json({
        error: error.message.split(':')[2]
    })
}

//handling delete task error
const deleteTaskErrorHandler = (error, req, res, next) => {
    res.status(404).json({
        error: error.message
    })
}

//handling fetch tasks for authenticated user
const fetchTasksErrorHandler = (error, req, res, next) => {
    res.status(error.status).json({
        message: error.message
    })
}


//exporting section
module.exports = {
    createNewTaskErrorHandler,
    deleteTaskErrorHandler,
    fetchTasksErrorHandler
}