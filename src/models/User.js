//third-party packages and libs 
const mongoose = require('mongoose');
const validator = require('validator');

//user Schema 
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('email is unvalid');
            }
        }
    },

    password: {
        type: String,
        required: true,
        minlength:7,
        trim: true,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('password cannot contain "password"');
            }
        }
    }
},{
    timestamps: true
})

//modelizing user Schema
const User = mongoose.model('User', userSchema);

module.exports = User;