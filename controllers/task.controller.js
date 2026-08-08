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

// Create Project Task
async function createProjectTask(req, res) {
    try {
        const { title, deadline, priority, status } = req.body

        const foundProject = await Project.findById(req.params.id)

        const isCollaborator = foundProject.collaberators.some(
            id => id.toString() === req.user._id.toString()
        )

        if ((foundProject.owner != req.user._id) || !isCollaborator) {
            return res.status(403).json({ message: 'You are not authorized to add a task to this project' })
        }

        const createdTask = await Task.create({
            title,
            deadline,
            priority,
            status: 'To Do',
            owner: req.user._id
        })

        foundProject.tasks.push(createdTask._id)
        await foundProject.save()

    }
    catch (err) {
        if (err.name === 'ValidationError') {
            return res.status(400).json({ message: err.message })
        }

        return res.status(500).json({ message: err.message })
    }
}


module.exports = {
    getTasksDeadline,
    createProjectTask

}