const mongoose = require('mongoose')
function validateObjectId(req, res, next) {
  
const idsToCheck = ['id', 'courseId', 'taskId']

    for (const id of idsToCheck) {
        const param = req.params[id]

        if (param && !mongoose.Types.ObjectId.isValid(param)) {
            return res.status(404).json({ message: 'No object matching id provided' })
        }
    }

  next()
}

module.exports = validateObjectId