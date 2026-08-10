const Task = require('../../models/Task')

async function checkTaskOwner(req, res, next) {

    const foundTask = await Task.findById(req.params.taskId).populate('owner')
    
    const isOwner = foundTask.owner?._id
        ? foundTask.owner._id.toString() === req.user._id.toString()
        : foundTask.owner?.toString() === req.user._id.toString()


    if (!isOwner) {
        return res.status(403).json({ message: 'You are not authorized to do this action' })
    }

    req.foundTask = foundTask
    next()
}

module.exports = checkTaskOwner