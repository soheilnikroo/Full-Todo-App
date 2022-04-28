//third-party packages and libs
const mongoose = require('mongoose'); 

//task schema
const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'title is required']
    },
    
    description: {
        type: String,
        required: [true, 'description is required']
    },

    isDone: {
        type: Boolean,
        default: false
    },

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
});

//modelizing task Schema
const Task = mongoose.model('Task', taskSchema);

//exporting section
module.exports = Task;