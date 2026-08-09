const router = require("express").Router();
const courseController = require('../controllers/course.controller');

const verifyToken = require("../middleware/verifyToken");
const validateObjectId = require('../middleware/validateObjectId')
const checkCourseOwner = require('../middleware/validation/checkCourseOwner')
const checkTaskOwner = require('../middleware/validation/checkTaskOwner')

router.post('/', verifyToken, courseController.createCourse)
router.get('/', verifyToken, courseController.allCourses)

router.get('/:courseId', verifyToken, validateObjectId , checkCourseOwner, courseController.getCourse)
router.put('/:courseId', verifyToken, validateObjectId, checkCourseOwner, courseController.updateCourse)
router.delete('/:courseId', verifyToken, validateObjectId, checkCourseOwner, courseController.deleteCourse)

router.post('/:courseId/tasks', verifyToken, validateObjectId, checkCourseOwner, courseController.createCourseTask)
router.get('/:courseId/tasks', verifyToken, validateObjectId, checkCourseOwner, courseController.getAllCourseTasks)
router.get('/:courseId/tasks/:taskId', verifyToken, validateObjectId, checkTaskOwner, courseController.getCourseTaskDetails)
router.put('/:courseId/tasks/:taskId', verifyToken, validateObjectId, checkTaskOwner, courseController.updateCourseTaskById)
router.put('/:courseId/tasks/:taskId/status', verifyToken, validateObjectId, checkTaskOwner, courseController.updateCourseTaskStatus)
router.delete('/:courseId/tasks/:taskId', verifyToken, validateObjectId, checkCourseOwner, checkTaskOwner, courseController.deleteCourseTaskById)

module.exports = router;
