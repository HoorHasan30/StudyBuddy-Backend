const router = require("express").Router();
const courseController = require('../controllers/course.controller');
const verifyToken = require("../middleware/verifyToken");

router.post('/', verifyToken, courseController.createCourse)
router.get('/', verifyToken, courseController.allCourses)
router.get('/:courseId', verifyToken, courseController.getCourse)
router.put('/:courseId', verifyToken, courseController.updateCourse)
module.exports = router;
