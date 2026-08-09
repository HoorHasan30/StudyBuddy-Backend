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
        const getOneCourse = await Course.findById(req.params.courseId)

        if (!getOneCourse) {
            return res.status(404).json({ message: 'no course found, add yours!' })
        }

        res.status(200).json(getOneCourse)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function updateCourse(req, res) {
    try {

        const foundCourse = await Course.findById(req.params.courseId)

        if (foundCourse.owner != req.user._id) {
            return res.status(403).json({ message: 'You are not authorized to update this course details' })
        }

        const { title, description } = req.body
        foundCourse.title = title
        foundCourse.description = description
        await foundCourse.save()

        // const updatedCourse = await Course.findByIdAndUpdate(req.params.courseId, { title, description }, { new: true })
        // res.status(200).json(updatedCourse)
        res.status(200).json(foundCourse)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function deleteCourse(req, res) {
    try {

        const foundCourse = await Course.findById(req.params.courseId)

        if (foundCourse.owner != req.user._id) {
            return res.status(403).json({ message: 'You are not authorized to update this course details' })
        }

        const deletedCourse = await Course.findByIdAndDelete(req.params.courseId)

        if (!deletedCourse) {
            return res.status(404).json({ message: 'no course found, add yours!' })
        }

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

        const foundCourse = await Course.findById(req.params.courseId)

        if(!foundCourse.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'You are not authorized to add a task to this course' })
        }

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
        const foundCourse = await Course.findById(req.params.courseId).select('tasks')
        res.status(200).json(foundCourse)
    }
    catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

// Get task details
async function getCourseTaskDetails(req, res) {
    try {
        const foundTask = await Task.findById(req.params.taskId)
        res.status(200).json(foundTask)
    }
    catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

// update task details
async function updateCourseTaskById(req, res) {
    try {
        const foundTask = await Task.findById(req.params.taskId)


        if (foundTask.owner != req.user._id) {
            return res.status(403).json({ message: 'You are not authorized to update this task' })
        }

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

// delete task details
async function deleteCourseTaskById(req, res) {
    try {
        const foundTask = await Task.findById(req.params.taskId)
       
        if (foundTask.owner != req.user._id) {
            return res.status(403).json({ message: 'You are not authorized to delete this task' })
        }

        const foundCourse = await Course.findById(req.params.courseId)

        if (foundTask.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'You are not authorized to delete this task' })
        }

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
    deleteCourseTaskById
}