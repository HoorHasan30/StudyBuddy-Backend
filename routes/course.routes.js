const router = require("express").Router();
const courseController = require('../controllers/course.controller');
const verifyToken = require("../middleware/verifyToken");
const validateObjectId = require('../middleware/validateObjectId')

router.post('/', verifyToken, courseController.createCourse)
router.get('/', verifyToken, courseController.allCourses)

router.get('/:courseId', verifyToken, validateObjectId , courseController.getCourse)
router.put('/:courseId', verifyToken, validateObjectId, courseController.updateCourse)
router.delete('/:courseId', verifyToken, validateObjectId, courseController.deleteCourse)

router.post('/:courseId/tasks', verifyToken, validateObjectId, courseController.createCourseTask)
router.get('/:courseId/tasks', verifyToken, validateObjectId, courseController.getAllCourseTasks)
router.get('/:courseId/tasks/:taskId', verifyToken, validateObjectId, courseController.getCourseTaskDetails)
router.put('/:courseId/tasks/:taskId', verifyToken, validateObjectId, courseController.updateCourseTaskById)
router.delete('/:courseId/tasks/:taskId', verifyToken, validateObjectId, courseController.deleteCourseTaskById)

module.exports = router;
