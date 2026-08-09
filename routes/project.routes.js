const router = require("express").Router();
const projectController = require('../controllers/project.controller')

const verifyToken = require("../middleware/verifyToken");
const validateObjectId = require('../middleware/validateObjectId')

router.post('/', verifyToken, projectController.createProject)

router.get('/', verifyToken, projectController.getMyProjects)
router.get('/deadlines', verifyToken, projectController.getProjectsDeadline)


router.get('/:id', verifyToken, validateObjectId, projectController.getOneProject)
router.put('/:id/edit', verifyToken, validateObjectId, projectController.updateProjectDetails)
router.delete('/:id', verifyToken, validateObjectId, projectController.deleteProject)


router.put('/:id/add-collaberator', verifyToken, validateObjectId, projectController.addCollaberator)
router.put('/:id/remove-collaberator', verifyToken, validateObjectId, projectController.removeCollaberator)

router.post('/:id/tasks', verifyToken, validateObjectId, projectController.createProjectTask)
router.get('/:id/tasks', verifyToken, validateObjectId, projectController.getAllProjectTasks)
router.get('/:id/tasks/:taskId', verifyToken, validateObjectId, projectController.getProjectTaskDetails)
router.put('/:id/tasks/:taskId', verifyToken, validateObjectId, projectController.updateProjectTaskById)
router.put('/:id/tasks/:taskId/status', verifyToken, validateObjectId, projectController.updateProjectTaskStatus)
router.delete('/:id/tasks/:taskId', verifyToken, validateObjectId, projectController.deleteProjectTaskById)

module.exports = router;