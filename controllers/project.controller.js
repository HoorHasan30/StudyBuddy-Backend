const Project = require('../models/Project')
const User = require('../models/User')
const Task = require('../models/Task')

// Create
async function createProject(req, res) {
    try {

        const { title, description, deadline } = req.body

        const createdProject = await Project.create({
            title,
            description,
            deadline,
            owner: req.user._id
        })

        res.status(201).json(createdProject)
    }
    catch (err) {
        if (err.name === 'ValidationError') {
            return res.status(400).json({ message: err.message })
        }

        return res.status(500).json({ message: err.message })
    }
}

// Get my all projects
async function getMyProjects(req, res) {
    try {
        const myProjects = await Project.find({
            $or: [
                { owner: req.user._id },
                { collaberators: req.user._id }
            ]
        })

        res.status(200).json(myProjects)
    }
    catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

// Get one project
async function getOneProject(req, res) {
    try {
        const foundProject = req.foundProject

        res.status(200).json(foundProject)
    }
    catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

// Get projects deadlines
async function getProjectsDeadline(req, res) {
    try {
        const myProjectsDeadline = await Project.find({
            $or: [
                { owner: req.user._id },
                { collaberators: req.user._id }
            ]
        }).select('deadline')

        res.status(200).json(myProjectsDeadline)
    }
    catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

// Update project details
async function updateProjectDetails(req, res) {
    try {
        const foundProject = req.foundProject

        const { title, description, deadline } = req.body

        foundProject.title = title
        foundProject.description = description
        foundProject.deadline = deadline
        foundProject.save()

        res.status(200).json(foundProject)
    }
    catch (err) {
        if (err.name === 'ValidationError') {
            return res.status(400).json({ message: err.message })
        }

        res.status(500).json({ message: err.message })
    }
}


// Delete project
async function deleteProject(req, res) {
    try {
        const foundProject = req.foundProject

        if (foundProject.tasks && foundProject.tasks.length) {
            await Task.deleteMany({_id: { $in: foundProject.tasks }})
        }

        const deletedProject = await Project.findByIdAndDelete(req.params.id)

        res.status(200).json({ message: 'Project Deleted Successfully' })

    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}

//  Add collaberator
async function addCollaberator(req, res) {
    try {
        const { username } = req.body

        if (!username) {
            return res.status(404).json({ message: 'User is required' })
        }

        const newCollaberator = await User.findOne({ username }).select('_id')

        if (!newCollaberator) {
            return res.status(404).json({ message: 'User not found' })
        }

        const foundProject = req.foundProject

        const alreadyAdded = foundProject.collaberators.some(
            collaborator => collaborator._id.toString() === newCollaberator._id.toString()
        )

        if (alreadyAdded) {
            return res.status(400).json({ message: 'User already added' })
        }

        foundProject.collaberators.push(newCollaberator._id)
        await foundProject.save()

        res.status(200).json(foundProject)
    }
    catch (err) {
        if (err.name === 'ValidationError') {
            return res.status(400).json({ message: err.message })
        }

        res.status(500).json({ message: err.message })
    }
}

// Remove collaberator
async function removeCollaberator(req, res) {
    try {

        const { username } = req.body

        if (!username) {
            return res.status(404).json({ message: 'User is required' })
        }

        const collaberator = await User.findOne({ username }).select('_id')

        if (!collaberator) {
            return res.status(404).json({ message: 'User not found' })
        }

        const foundProject = req.foundProject

        const allCollaberatorsExceptUser = foundProject.collaberators.length

        foundProject.collaberators = foundProject.collaberators.filter(
            id => id.toString() !== collaberator._id.toString()
        )

        if (foundProject.collaberators.length === allCollaberatorsExceptUser) {
            return res.status(404).json({ message: 'User is not a collaborator on this project' })
        }

        await foundProject.save()
        return res.status(200).json(foundProject)
    }
    catch (err) {
        if (err.name === 'ValidationError') {
            return res.status(400).json({ message: err.message })
        }

        res.status(500).json({ message: err.message })
    }
}

// Create Task
async function createProjectTask(req, res) {
    try {
        const { title, deadline, priority, status } = req.body

        const foundProject = req.foundProject

        const createdTask = await Task.create({
            title,
            deadline,
            priority,
            status: 'To Do',
            owner: req.user._id
        })

        foundProject.tasks.push(createdTask._id)
        await foundProject.save()

        res.status(200).json(foundProject)

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
        const foundProject = req.foundProject
        res.status(200).json(foundProject.tasks)
    }
    catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

// Get task details
async function getProjectTaskDetails(req, res) {
    try {
        const foundTask = req.foundTask
        res.status(200).json(foundTask)
    }
    catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

// update task details
async function updateProjectTaskById(req, res) {
    try {
        const foundTask = req.foundTask

        const { title, deadline, priority, status } = req.body

        foundTask.title = title
        foundTask.deadline = deadline
        foundTask.priority = priority
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

// update task status
async function updateProjectTaskStatus(req, res) {
    try {
        const foundTask = req.foundTask

        const { status } = req.body

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

// delete task details
async function deleteProjectTaskById(req, res) {
    try {
        const foundTask = req.foundTask

        const foundProject = req.foundProject

        foundProject.tasks = foundProject.tasks.filter(
            id => id.toString() !== foundTask._id.toString()
        )

        await foundProject.save()
        const deletedTask = await Task.findByIdAndDelete(req.params.taskId)

        res.status(200).json({ message: 'Task Deleted Successfully' })
    }
    catch (err) {
        return res.status(500).json({ message: err.message })
    }
}


module.exports = {
    createProject,
    getMyProjects,
    getOneProject,
    getProjectsDeadline,
    updateProjectDetails,
    addCollaberator,
    removeCollaberator,
    deleteProject,
    createProjectTask,
    getAllProjectTasks,
    getProjectTaskDetails,
    updateProjectTaskById,
    updateProjectTaskStatus,
    deleteProjectTaskById
}