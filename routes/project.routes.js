const router = require("express").Router();
const projectController = require('../controllers/project.controller')

const verifyToken = require("../middleware/verifyToken");
const validateObjectId = require('../middleware/validateObjectId')

router.post('/', verifyToken, projectController.createProject)
router.get('/', verifyToken, projectController.getMyProjects)
router.get('/deadlines', verifyToken, projectController.getProjectsDeadline)


router.get('/:id', verifyToken, validateObjectId, projectController.getOneProject)
router.put('/:id/edit', verifyToken, validateObjectId, projectController.updateProjectDetails)
router.put('/:id/add-collaberator', verifyToken, validateObjectId, projectController.addCollaberator)
router.put('/:id/remove-collaberator', verifyToken, validateObjectId, projectController.removeCollaberator)


router.delete('/:id', verifyToken, validateObjectId, projectController.deleteProject)

module.exports = router;