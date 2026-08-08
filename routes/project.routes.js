const router = require("express").Router();
const projectController = require('../controllers/project.controller')

const verifyToken = require("../middleware/verifyToken");
const validateObjectId = require('../middleware/validateObjectId')

router.post('/', verifyToken, projectController.createProject)

module.exports = router;