const Project = require('../models/Project')

// Create
async function createProject(req, res){
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
    catch(err) {
        if (err.name === 'ValidationError') {
            return res.status(400).json({ message: err.message })
        }

        return res.status(500).json({ message: err.message })
    }
}

// Get my all projects
async function getMyProjects(req, res){
    try{
        const myProjects = await Project.find({owner: req.user._id})
        res.status(200).json(myProjects)
    }
    catch(err){
        return res.status(500).json({message: err.message})
    }
}

async function getOneProject(req, res){
    try{
        const foundProject = await Project.findById(req.params.id)

        if(!foundProject){
            return res.status(404).json({message: 'No Project matches the id provided'})
        }

        res.status(200).json(foundProject)

    }
    catch(err){
        return res.status(500).json({message: err.message})
    }
}

module.exports = {
    createProject,
    getMyProjects,
    getOneProject
}