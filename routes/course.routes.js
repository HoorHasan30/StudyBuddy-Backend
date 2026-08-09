const router = require("express").Router();
const courseController = require('../controllers/course.controller');
const verifyToken = require("../middleware/verifyToken");
const validateObjectId = require('../middleware/validateObjectId')

router.post('/', verifyToken, courseController.createCourse)
router.get('/', verifyToken, courseController.allCourses)

router.get('/:courseId', verifyToken, validateObjectId , courseController.getCourse)
router.put('/:courseId', verifyToken, validateObjectId, courseController.updateCourse)
router.delete('/:courseId', verifyToken, validateObjectId, courseController.deleteCourse)

module.exports = router;
