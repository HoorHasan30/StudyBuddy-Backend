const Project = require('../../models/Project')

async function checkProjectOwner(req, res, next) {

    const foundProject = await Project.findById(req.params.id)

    const isOwner = foundProject.owner.toString() === req.user._id.toString()
    
    const isCollaborator = foundProject.collaberators.some(
        id => id.toString() === req.user._id.toString()
    )

    if (!isOwner && !isCollaborator) {
        return res.status(403).json({ message: 'You are not authorized to do this action' })
    }

    req.foundProject = foundProject
    next()
}

module.exports = checkProjectOwner