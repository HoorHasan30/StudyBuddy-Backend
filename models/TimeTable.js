const { model, Schema } = require('mongoose')

const timeTableSchema = new Schema({
    tableImage: {
        type: String
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }

})

const TimeTable = model('TimeTable', timeTableSchema)

module.exports = TimeTable

