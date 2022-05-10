//handling create new task errors
const createNewTaskErrorHandler = (error, req, res, next) => {
    res.status(400).json({
        error: error.message.split(':')[2]
    });
}

//handling delete task errors
const deleteTaskErrorHandler = (error, req, res, next) => {
    res.status(error.status).json({
        error: error.message
    });
}

//handling fetch tasks errors
const fetchTasksErrorHandler = (error, req, res, next) => {
    res.status(error.status).json({
        error: error.message
    });
}

//handling patch task errors
const patchTaskErrorHandler = (error, req, res, next) => {
    res.status(error.status).json({
        error: error.message
    });
}

//exporting section
module.exports = {
    createNewTaskErrorHandler,
    deleteTaskErrorHandler,
    fetchTasksErrorHandler,
    patchTaskErrorHandler
}