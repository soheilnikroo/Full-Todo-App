//third-party packages and libs 
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
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

//mongoose hooks

//hashing password before saving it to database
userSchema.pre('save', async function(next){
    const user = this;
    try{
        const salts = await bcrypt.genSalt(8);
        user.password = await bcrypt.hash(user.password, salts);
        next(); 
    }catch(error){
        console.log(error);
    }
})

//modelizing user Schema
const User = mongoose.model('User', userSchema);

module.exports = User;