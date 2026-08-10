const Task = require('../models/Task')
const Project = require('../models/Project')

// Get tasks deadline
async function getTasksDeadline(req, res) {
    try {
        const todaysDate = new Date()
        todaysDate.setHours(0,0,0,0)

        const myTasksDeadline = await Task.find({
            $or: [
                { owner: req.user._id },
                { collaberators: req.user._id }
            ],
            status : {$in: ['To Do', 'In Progress']},
            deadline:  { $gte: todaysDate }
        })
        .select('deadline title')
        .sort({ deadline: 1 })

        res.status(200).json(myTasksDeadline)
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}

module.exports = {
    getTasksDeadline
}