const router = require("express").Router();
const timetableController = require('../controllers/timeTable.controller')
const verifyToken = require('../middleware/verifyToken')
const cloudinary = require('../middleware/cloudinary')
const upload = require('../middleware/multer')

router.post('/', verifyToken,  upload.single('image'), timetableController.createTableImg)
router.get('/', verifyToken, timetableController.getTableImg)
router.delete('/', verifyToken, timetableController.deleteTableImg)


module.exports = router