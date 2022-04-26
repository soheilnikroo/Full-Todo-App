//third-party packages and libs
const mongoose = require('mongoose'); 

//task schema
const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },

    isDone: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

//modelizing task Schema
const Task = mongoose.model('task', taskSchema);

//exporting section
module.exports = Task;