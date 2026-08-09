const Task = require('../../models/Task')

async function checkTaskOwner(req, res, next) {

    const foundTask = await Task.findById(req.params.taskId).populate('owner')

    if (foundTask.owner != req.user._id) {
        return res.status(403).json({ message: 'You are not authorized to do this action' })
    }
    
    req.foundTask = foundTask
    next()
}

module.exports = checkTaskOwner