const Course = require('../models/Course')

async function createCourse(req, res){

    try {
        const {title, description} = req.body
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

async function allCourses(req, res){
    try {
        const getAllCourses = await Course.find()
        res.status(200).json(getAllCourses)
        
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function getCourse(req, res){
    try {
        const getOneCourse = await Course.findById(req.params.courseId)
        res.status(200).json(getOneCourse)
        
    } catch (error) {
        res.status(500).json({ message: error.message })
        
    }
}

async function updateCourse(req, res){}

async function deleteCourse(req, res){}

module.exports = {
    createCourse,
    allCourses,
    getCourse,
    updateCourse,
    deleteCourse
}