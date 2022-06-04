//signin up with wrong or dupplicated credentials
const creatingUserErrorHandler = (error, req, res, next) => {
    const message = {}, errors = error.errors, errorCode = error.code;
    if(errorCode === 11000){
        message.email = 'email must be unique';
        res.status(400).json({
            error: message
        })
    }

    if(error.message.includes('User validation failed')){        
        const errorPaths = Object.keys(errors);
        errorPaths.forEach(errorCase => {
            message[errorCase] = errors[errorCase].message;
        })
        res.status(400).json({
            error: message
        })
    }  
}

//logging in with wrong credentials
const loginErrorHandler = (error, req, res, next) => {
    res.status(error.status).json({
        error: error.message
    })
}

//logging the user out 
const logOutErrorHandler = (error, req, res, next) => {
    res.status(error.status).json({
        error: error.message
    })
}

//handling profile data server 
const getUserProfileErrorHandler = (error, req, res, next) => {
    res.status(error.status).json({
        error: error.message
    })
}

//handling patch user profile
const patchUserProfileErrorHandler = (error, req, res, next ) => {
    res.status(error.status).json({
        error: error.message
    })
}

//saving new avatar error handler
const saveAvatarErrorHandler = (error, req, res, next) => {
    res.status(400).json({
        error: error.message
    })
};

//deleting avatar from user account error handler
const deleteExistingAvatarErrorHandler = (error, req, res, next) => {
    res.status(error.status).json({
        error: error.message
    })
}

//get avatar for user profile error Handler
const getAvatarErrorHandler = (error, req, res, next) => {
    res.status(error.status).json({
        error: error.message
    })
}

//exporting section
module.exports = {
    creatingUserErrorHandler,
    loginErrorHandler,
    logOutErrorHandler,
    getUserProfileErrorHandler,
    patchUserProfileErrorHandler,
    saveAvatarErrorHandler,
    deleteExistingAvatarErrorHandler,
    getAvatarErrorHandler
}
