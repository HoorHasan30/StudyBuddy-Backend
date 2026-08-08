const router = require("express").Router();
const courseController = require('../controllers/course.controller');
const verifyToken = require("../middleware/verifyToken");

router.post('/', verifyToken, courseController.createCourse)

module.exports = router;
