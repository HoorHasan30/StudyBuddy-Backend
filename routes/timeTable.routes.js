const router = require("express").Router();
const timetableController = require('../controllers/timeTable.controller')
const verifyToken = require('../middleware/verifyToken')

router.post('/', verifyToken, timetableController.createTableImg)
router.get('/', verifyToken, timetableController.getTableImg)
router.delete('/', verifyToken, timetableController.deleteTableImg)


module.exports = router