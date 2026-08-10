const { model, Schema } = require('mongoose')

const timeTableSchema = new Schema({
    tableImage: {
        url:{
            type: String

        }
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }

}, {timestamps: true})

const TimeTable = model('TimeTable', timeTableSchema)

module.exports = TimeTable

