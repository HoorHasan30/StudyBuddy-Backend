const {model, Schema} = require('mongoose')

const courseSchema = new Schema({
    title:{
        type: String,
        required: true,
        trim: true
    },
    description:{
        type: String,
        trim: true
    },
    owner:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    tasks: [{
        type: Schema.Types.ObjectId,
        ref: 'Task'
    }]

}, {timestamps: true})

const Course = model('Course', courseSchema)

module.exports = Course