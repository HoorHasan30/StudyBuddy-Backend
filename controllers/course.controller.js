const Course = require('../models/Course')

async function createCourse(req, res) {

    try {
        const { title, description } = req.body
        const createdCourse = await Course.create({
            title,
            description,
            owner: req.user._id
        })

        res.status(201).json(createdCourse)
    } catch (error) {
        res.status(500).json({ message: error.message })

    }
}

async function allCourses(req, res) {
    try {
        const getAllCourses = await Course.find({owner: req.user._id})
        res.status(200).json(getAllCourses)

    } catch (error) {
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
        const { title, description } = req.body
        const updatedCourse = await Course.findByIdAndUpdate(req.params.courseId, { title, description }, { new: true })
        res.status(200).json(updatedCourse)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function deleteCourse(req, res) {
    try {
        const deletedCourse = await Course.findByIdAndDelete(req.params.courseId)
        
        if (!deletedCourse) {
            return res.status(404).json({ message: 'no course found, add yours!' })
        }
        
        res.status(204).json(deletedCourse)
    } catch (error) {
        res.status(500).json({ message: error.message })

    }
}

module.exports = {
    createCourse,
    allCourses,
    getCourse,
    updateCourse,
    deleteCourse
}