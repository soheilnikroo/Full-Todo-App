//third-party packages and libs 
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');

//user Schema 
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('email is unvalid');
            }
        }
    },
    userName: {
        type: String,
        defalut: ''
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
    },

    tokens: [{
        token:{
            type: String,
            required: true,
        }
    }]
},{
    timestamps: true
})

//custom methods on User model

//finding user by credentials
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });

    if(!user){
        throw new Error('unable to login');
    };

    const passwordIsMatch = await bcrypt.compare(password, user.password);

    if(!passwordIsMatch){
        throw new Error('unable to login');
    };

    return user;
}




//custom methods on User instance

//generating authentication token for user
userSchema.methods.generateAuthToken = async function(){
    const user = this;
    try{
        const token = await jwt.sign({_id: user._id}, process.env.JWT_SECRET);
        user.tokens = user.tokens.concat({token});
        await user.save();
        return token
    }catch(error){
        console.log(error);
    }
}

//extracting public data from user to send profile data
userSchema.methods.toJSON = function(){
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;
    delete userObject._id;
    delete userObject.__v;
    delete userObject.createdAt;
    delete userObject.updatedAt;

    return userObject;
}

//mongoose hooks

//initializing username base on email
userSchema.pre('save', function(next){
    const user = this;
    if(user.isModified('userName')){
        user.userName = user.email.split('@')[0];
    };
    next();
})

//hashing password before saving it to database
userSchema.pre('save', async function(next) {
    const user = this; 
    if(user.isModified('password')){
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt) ;
    }
    next();
})

//modelizing user Schema
const User = mongoose.model('User', userSchema);

//exporting section
module.exports = User;