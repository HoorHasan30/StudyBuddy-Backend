const router = require("express").Router();
const sessionController = require('../controllers/session.controller')
const verifyToken = require('../middleware/verifyToken')
router.post('/',verifyToken , sessionController.createSession)


module.exports = router