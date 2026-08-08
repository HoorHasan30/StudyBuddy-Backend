const router = require("express").Router();
const taskController = require('../controllers/task.controller')

const verifyToken = require("../middleware/verifyToken");
const validateObjectId = require('../middleware/validateObjectId')


router.post('/:id/tasks', verifyToken, validateObjectId, taskController.getTasksDeadline)

module.exports = router