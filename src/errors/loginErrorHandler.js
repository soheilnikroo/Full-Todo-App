const { restart } = require("nodemon")

//logic section
const loginErrorHandler = (error, req, res, next) => {
    res.status(error.status);
    res.json({
        error: {
            message: error.message
        }
    })
}

//exporting section
module.exports = loginErrorHandler;