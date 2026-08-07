const { json } = require('express')
const TimeTable = require('../models/TimeTable')

async function createTableImg(req, res) {
    try {
        const { tableImage } = req.body
        const createdImg = await TimeTable.create({
            tableImage,
            owner: req.user._id
        })
        res.status(201).json(createdImg)

    } catch (error) {
        res.status(500).json({ message: error.message })

    }
}
async function getTableImg(req, res) {

    try {
        const foundTimeTable = await TimeTable.findOne({ owner: req.user._id })

        if (!foundTimeTable) {
            res.status(404).json({ message: 'no timeTable found, add yours!' })

        }
        res.status(200).json(foundTimeTable)

    } catch (error) {
        res.status(500).json({ message: error.message })

    }
}

async function deleteTableImg(req, res) {


}

module.exports = {
    createTableImg,
    getTableImg,
    deleteTableImg
}