const Course = require('../../models/Course')

async function checkCourseOwner(req, res, next) {

    const foundCourse = await Course.findById(req.params.courseId)

    if (foundCourse.owner != req.user._id) {
        return res.status(403).json({ message: 'You are not authorized to do this action' })
    }
    
    req.foundCourse = foundCourse
    next()
}

module.exports = checkCourseOwner