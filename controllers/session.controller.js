const Session = require('../models/Session')

async function createSession(req, res) {
    try {

        const { duration, topicsCovered } = req.body

        const createdSession = await Session.create({
            duration,
            owner: req.user._id
        })

        res.status(201).json(createdSession)

    } catch (error) {
        if (err.name === 'ValidationError') {
            return res.status(400).json({ message: err.message })
        }

        res.status(500).json({ message: error.message })

    }
}

async function getAllSessions(req, res) {
    try {
        const allSessions = await Session.find({owner:req.user._id})
        res.status(200).json(allSessions)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = {
    createSession,
    getAllSessions
}