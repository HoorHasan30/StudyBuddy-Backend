const Project = require('../../models/Project')

async function checkProjectOwner(req, res, next) {

    const foundProject = await Project.findById(req.params.id).populate({
        path: 'tasks',
        populate: {
            path: 'owner',
            select: '_id username'
        }
    }).populate('collaberators')
    .populate({ path: 'owner', select: '_id username' })

    const isOwner = foundProject.owner.toString() === req.user._id.toString()

    const isCollaborator = foundProject.collaberators.some(
        collaborator => collaborator._id.toString() === req.user._id.toString()
    )

    if (!isOwner && !isCollaborator) {
        return res.status(403).json({ message: 'You are not authorized to do this action' })
    }

    req.foundProject = foundProject
    next()
}

module.exports = checkProjectOwner