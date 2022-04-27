//signin up with wrong or dupplicated credentials
const creatingUserErrorHandler = (error, req, res, next) => {
    const message = {}, errors = error.errors, errorCode = error.code;
    if(errorCode === 11000){
        message.email = 'email must be unique';
        res.status(400).json({
            error: {
                message
            }
        })
    }

    if(error.message.includes('User validation failed')){        
        const errorPaths = Object.keys(errors);
        errorPaths.forEach(errorCase => {
            message[errorCase] = errors[errorCase].message;
        })
        res.status(400).json({
            error: {
                message
            }
        })
    }  
}

//logging in with wrong credentials
const loginErrorHandler = (error, req, res, next) => {
    res.status(error.status);
    res.json({
        error: {
            message: error.message
        }
    })
}

//exporting section
module.exports = {
    creatingUserErrorHandler,
    loginErrorHandler
}
