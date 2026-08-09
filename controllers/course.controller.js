const Course = require('../models/Course')
const Task = require('../models/Task')

async function createCourse(req, res) {

    try {
        const { title, description } = req.body

        const createdCourse = await Course.create({
            title,
            description,
            owner: req.user._id
        })

        res.status(201).json(createdCourse)
    }
    catch (error) {
        if (err.name === 'ValidationError') {
            return res.status(400).json({ message: err.message })
        }

        res.status(500).json({ message: error.message })
    }
}

async function allCourses(req, res) {
    try {
        const getAllCourses = await Course.find({ owner: req.user._id })
        res.status(200).json(getAllCourses)
    } 
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function getCourse(req, res) {
    try {
        const getOneCourse = req.foundCourse
        res.status(200).json(getOneCourse)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function updateCourse(req, res) {
    try {

        const foundCourse = req.foundCourse

        const { title, description } = req.body
        foundCourse.title = title
        foundCourse.description = description
        await foundCourse.save()

        res.status(200).json(foundCourse)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function deleteCourse(req, res) {
    try {

        const foundCourse = req.foundCourse

        const deletedCourse = await Course.findByIdAndDelete(req.params.courseId)

        res.status(204).json(deletedCourse)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


// TASKS
// Create Task
async function createCourseTask(req, res) {
    try {
        const { title, deadline, priority, status } = req.body

        const foundCourse = req.foundCourse

        const createdTask = await Task.create({
            title,
            deadline,
            priority,
            status: 'To Do',
            owner: req.user._id
        })

        foundCourse.tasks.push(createdTask._id)
        await foundCourse.save()

        res.status(200).json(foundCourse)

    }
    catch (err) {
        if (err.name === 'ValidationError') {
            return res.status(400).json({ message: err.message })
        }

        return res.status(500).json({ message: err.message })
    }
}

// Get tasks
async function getAllCourseTasks(req, res) {
    try {
        const foundCourse = req.foundCourse
        res.status(200).json(foundCourse.tasks)
    }
    catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

// Get task details
async function getCourseTaskDetails(req, res) {
    try {
        const foundTask = req.foundTask
        res.status(200).json(foundTask)
    }
    catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

// update task details
async function updateCourseTaskById(req, res) {
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
async function updateCourseTaskStatus(req, res) {
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
async function deleteCourseTaskById(req, res) {
    try {
        const foundTask = req.foundTask

        const foundCourse = req.foundCourse

        foundCourse.tasks = foundCourse.tasks.filter(
            id => id.toString() !== foundTask._id.toString()
        )
        
        await foundCourse.save()
        const deletedTask = await Task.findByIdAndDelete(req.params.taskId)

    
        res.status(200).json({message: 'Task Deleted Successfully'})
    }
    catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

module.exports = {
    createCourse,
    allCourses,
    getCourse,
    updateCourse,
    deleteCourse,
    createCourseTask,
    getAllCourseTasks,
    getCourseTaskDetails,
    updateCourseTaskById,
    updateCourseTaskStatus,
    deleteCourseTaskById
}