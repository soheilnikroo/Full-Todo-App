//third-party packages and libs 
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');

//user Schema 
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: [true, 'this email is alreday exists'],
        trim: true,
        validate: [validator.isEmail, 'invalid email']
    },
    userName: {
        type: String,
        required: [true, 'name is required'],
    },

    password: {
        type: String,
        required: [true, 'password is required'],
        minlength:[6, 'password must be at least 6 characters'],
        trim: true,
    },

    tokens: [{
        token:{
            type: String,
            required: true,
        }
    }],

    imageUrl: {
        type: String,
        default: '',
    }
},{
    timestamps: true
})

//virtual fields

//one to one relation Users/tasks <==> Task/owner
userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
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