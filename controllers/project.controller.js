const Project = require('../models/Project')
const User = require('../models/User')

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
        const foundProject = await Project.findById(req.params.id)

        if (!foundProject) {
            return res.status(404).json({ message: 'No Project matches the id provided' })
        }

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
        const foundProject = await Project.findById(req.params.id)

        if (foundProject.owner != req.user._id) {
            return res.status(403).json({ message: 'You are not authorized to update this project details' })
        }

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

        const foundProject = await Project.findById(req.params.id)

        if (foundProject.owner != req.user._id) {
            return res.status(403).json({ message: 'You are not authorized to add collaberators to this project' })
        }

        const alreadyAdded = foundProject.collaberators.some(
            id => id.toString() === newCollaberator._id.toString()
        )

        if (alreadyAdded) {
            return res.status(400).json({ message: 'User already added' })
        }

        foundProject.collaberators.push(newCollaberator)
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

        const foundProject = await Project.findById(req.params.id)

        if (foundProject.owner != req.user._id) {
            return res.status(403).json({ message: 'You are not authorized to remove collaberators to this project' })
        }

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

// Delete project
async function deleteProject(req, res){
    try{
        const foundProject = await Project.findById(req.params.id)
        
        if (foundProject.owner != req.user._id) {
            return res.status(403).json({ message: 'You are not authorized to delete this project' })
        }

       const deletedProject = await Project.findByIdAndDelete(req.params.id)

       res.status(200).json({message: 'Project Deleted Successfully'})

    }
    catch(err){
        res.status(500).json({ message: err.message })
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
    deleteProject
}