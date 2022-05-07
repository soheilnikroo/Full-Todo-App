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

//Task model custome methods

//making Task model publicable
taskSchema.statics.publicInfo = (task) => {
    const taskObject = task.toObject();

    delete taskObject.owner;
    delete taskObject.__v;
    delete taskObject.createdAt;
    delete taskObject.updatedAt;

    return taskObject;
}
//modelizing task Schema
const Task = mongoose.model('Task', taskSchema);

//exporting section
module.exports = Task;