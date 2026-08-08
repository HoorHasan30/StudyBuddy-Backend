const router = require("express").Router();
const projectController = require('../controllers/project.controller')

const verifyToken = require("../middleware/verifyToken");
const validateObjectId = require('../middleware/validateObjectId')

router.post('/', verifyToken, projectController.createProject)
router.get('/', verifyToken, projectController.getMyProjects)
router.get('/deadlines', verifyToken, projectController.getProjectsDeadline)


router.get('/:id', verifyToken, validateObjectId, projectController.getOneProject)
router.put('/:id/edit', verifyToken, validateObjectId, projectController.updateProjectDetails)

module.exports = router;