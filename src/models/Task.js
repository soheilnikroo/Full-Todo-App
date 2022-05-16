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

    circleColor: {
        type:String,
        default: '#0000FF'
    },

    index: {
        type: Number,
        default: 0,
    },

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
});

//mongoose hooks

//setting index for task base on quantity of existing tasks
taskSchema.pre('save', async function(next){
    try{
        const tasksQuantity = await Task.find({owner: this.owner, isDone: this.isDone}).count();
        this.index = tasksQuantity + 1;
        next();
    }catch(err){
        const error = {
            message: 'something went wrong in index initiation',
            status: 500,
        }
        next(error);
    }
});


//Task model custome methods

//making Task model publicable
taskSchema.statics.publicInfo = (task) => {
    const taskObject = task.toObject();

    delete taskObject.owner;
    delete taskObject.index;
    delete taskObject.__v;
    delete taskObject.createdAt;
    delete taskObject.updatedAt;

    return taskObject;
}
//modelizing task Schema
const Task = mongoose.model('Task', taskSchema);

//exporting section
module.exports = Task;