const mongoose = require('mongoose')
function validateObjectId(req, res, next) {
  
  // Checking the project
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).json({ message: "No object matching id provided" });
  }

  // checking the course
  if (!mongoose.Types.ObjectId.isValid(req.params.courseId)) {
    return res.status(404).json({ message: "No object matching id provided" });
  }

  // checking the task
  if (!mongoose.Types.ObjectId.isValid(req.params.taskId)) {
    return res.status(404).json({ message: "No object matching id provided" });
  }

  next()
}

module.exports = validateObjectId