//making userfriendly error for creating user
const creatingUserErrorHandler = (error) => {
    const userFriendlyError = {}, errors = error.errors, errorCode = error.code;
    if(errorCode === 11000){
        userFriendlyError.email = 'email must be unique';
        return userFriendlyError
    }

    if(error.message.includes('User validation failed')){        
        const errorPaths = Object.keys(errors);
        errorPaths.forEach(errorCase => {
            userFriendlyError[errorCase] = errors[errorCase].message;
        })
        return userFriendlyError
    }  
}

//exporting section
module.exports = {
    creatingUserErrorHandler
}