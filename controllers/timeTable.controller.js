const TimeTable = require('../models/TimeTable')

async function createTableImg(req, res) {
    try {
        const { tableImage } = req.body

        const createdImg = await TimeTable.findOneAndUpdate({owner:req.user._id},
            {
            tableImage,
            owner: req.user._id
        }, {new: true, upsert:true})

        res.status(201).json(createdImg)

    } catch (error) {
        res.status(500).json({ message: error.message })

    }
}
async function getTableImg(req, res) {

    try {
        const foundTimeTable = await TimeTable.findOne({ owner: req.user._id })

        if (!foundTimeTable) {
            return res.status(404).json({ message: 'no timeTable found, add yours!' })

        }
        res.status(200).json(foundTimeTable)

    } catch (error) {
        if (err.name === 'ValidationError') {
            return res.status(400).json({ message: err.message })
        }
        
        res.status(500).json({ message: error.message })

    }
}

async function deleteTableImg(req, res) {

    try {
        const deletedTimeTable = await TimeTable.findOneAndDelete({owner: req.user._id})
        
        if(!deleteTableImg){
            return res.status(404).json({ message: 'no timeTable found, add yours!' })

        }

        res.status(204).json(deletedTimeTable)
        
    } catch (error) {
        res.status(500).json({ message: error.message })

    }
}

module.exports = {
    createTableImg,
    getTableImg,
    deleteTableImg
}