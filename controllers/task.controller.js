const Task = require('../models/Task')
const Project = require('../models/Project')

// Get tasks deadline
async function getTasksDeadline(req, res) {
    try {
        const myTasksDeadline = await Task.find({
            $or: [
                { owner: req.user._id },
                { collaberators: req.user._id }
            ]
        }).select('deadline')
        res.status(200).json(myTasksDeadline)
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}

module.exports = {
    getTasksDeadline
}