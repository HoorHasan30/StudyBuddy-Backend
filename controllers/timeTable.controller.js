const TimeTable = require('../models/TimeTable')

async function createTableImg(req, res){
    try {
        const {tableImage} = req.body
        const createdImg = await TimeTable.create({
            tableImage,
            owner: req.user._id
        })
        res.status(201).json(createdImg)
        
    } catch (error) {
        res.status(500).json({ message: error.message })

    }
}
async function getTableImg(req, res){}
async function deleteTableImg(req, res){}

module.exports = {
    createTableImg,
    getTableImg,
    deleteTableImg
}