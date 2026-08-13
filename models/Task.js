const mongoose = require('mongoose')

// TO DO: Check Prioraty 

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    deadline: {
        type: Date,
        required: true
    },
    priority: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: 'To Do',
        enum: ['To Do', 'In Progress', 'Done']
    },
    owner: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {timestamps: true})

const Task = mongoose.model('Task', taskSchema)

module.exports = Task