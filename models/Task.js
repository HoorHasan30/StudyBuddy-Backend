const mongoose = require('mongoose')

// TO DO: Check Prioraty 

const taskSchema = new mongoose({
    title: {
        type: String,
        required: true
    },
    deadline: {
        type: Date
    },
    priority: {
        type: String
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
})

const Task = mongoose.model('Task', taskSchema)

module.exports = Task