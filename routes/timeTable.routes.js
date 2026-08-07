const router = require("express").Router();
const timetableController = require('../controllers/timeTable.controller')
const verifyToken = require('../middleware/verifyToken')

router.post('/', verifyToken, timetableController.createTableImg)

module.exports = router