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

// PROJECT
// Create Task
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

// Get tasks
async function getAllProjectTasks(req, res) {
    try {
        const foundProject = await Project.findById(req.params.id).select('tasks')
        res.status(200).json(foundProject)
    }
    catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

// Get task details
async function getProjectTaskDetails(req, res) {
    try {
        const foundTask = await Task.findById(req.params.taskId)
        res.status(200).json(foundTask)
    }
    catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

async function updateProjectTaskById(req, res) {
    try {
        const foundTask = await Task.findById(req.params.taskId)


        if (foundTask.owner != req.user._id) {
            return res.status(403).json({ message: 'You are not authorized to delete this task' })
        }

        const { title, deadline, priority, status } = req.body

        foundTask.title = title
        foundTask.deadline = deadline
        foundTask.priority = priority
        foundTask.status = status
        await foundTask.save()

        res.status(200).json(foundTask)
    }
    catch (err) {
        if (err.name === 'ValidationError') {
            return res.status(400).json({ message: err.message })
        }
        return res.status(500).json({ message: err.message })
    }
}

async function updateProjectTaskById(req, res) {
    try {
        const foundTask = await Task.findById(req.params.taskId)


        if (foundTask.owner != req.user._id) {
            return res.status(403).json({ message: 'You are not authorized to delete this task' })
        }

        const deletedTask = await Task.findByIdAndDelete(req.params.taskId)

        res.status(200).json({message: 'Task Deleted Successfully'})
    }
    catch (err) {
        return res.status(500).json({ message: err.message })
    }
}


// COURSE

module.exports = {
    getTasksDeadline,
    createProjectTask,
    getAllProjectTasks,
    getProjectTaskDetails,
    updateProjectTaskById
}