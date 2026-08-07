const { model, Schema } = require('mongoose')

const sessionSchema = new Schema({
    duration: {
        type: Number,
        required: true
    },
    topicsCovered: {
        type: String,
        trim: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Session = model('Session', sessionSchema)

module.exports = Session

