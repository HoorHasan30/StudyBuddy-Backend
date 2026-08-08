const router = require("express").Router();
const projectController = require('../controllers/project.controller')

const verifyToken = require("../middleware/verifyToken");
const validateObjectId = require('../middleware/validateObjectId')

router.post('/', verifyToken, projectController.createProject)
router.get('/', verifyToken, projectController.getMyProjects)
router.get('/:id', verifyToken, validateObjectId, projectController.getOneProject)

module.exports = router;