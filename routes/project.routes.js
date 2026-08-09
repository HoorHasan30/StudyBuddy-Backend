const router = require("express").Router();
const projectController = require('../controllers/project.controller')

const verifyToken = require("../middleware/verifyToken");
const validateObjectId = require('../middleware/validateObjectId')
const checkProjectOwner = require('../middleware/validation/checkProjectOwner')
const checkTaskOwner = require('../middleware/validation/checkTaskOwner')

router.post('/', verifyToken, projectController.createProject)

router.get('/', verifyToken, projectController.getMyProjects)
router.get('/deadlines', verifyToken, projectController.getProjectsDeadline)


router.get('/:id', verifyToken, validateObjectId, checkProjectOwner, projectController.getOneProject)
router.put('/:id/edit', verifyToken, validateObjectId, checkProjectOwner, projectController.updateProjectDetails)
router.delete('/:id', verifyToken, validateObjectId, checkProjectOwner, projectController.deleteProject)


router.put('/:id/add-collaberator', verifyToken, validateObjectId, checkProjectOwner, projectController.addCollaberator)
router.put('/:id/remove-collaberator', verifyToken, validateObjectId, checkProjectOwner, projectController.removeCollaberator)

router.post('/:id/tasks', verifyToken, validateObjectId, checkProjectOwner, projectController.createProjectTask)
router.get('/:id/tasks', verifyToken, validateObjectId, checkProjectOwner, projectController.getAllProjectTasks)
router.get('/:id/tasks/:taskId', verifyToken, validateObjectId, checkProjectOwner, checkTaskOwner, projectController.getProjectTaskDetails)
router.put('/:id/tasks/:taskId', verifyToken, validateObjectId, checkProjectOwner,  checkTaskOwner, projectController.updateProjectTaskById)
router.put('/:id/tasks/:taskId/status', verifyToken, validateObjectId, checkProjectOwner, checkTaskOwner, projectController.updateProjectTaskStatus)
router.delete('/:id/tasks/:taskId', verifyToken, validateObjectId, checkProjectOwner, checkTaskOwner, projectController.deleteProjectTaskById)

module.exports = router;