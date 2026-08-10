const TimeTable = require('../models/TimeTable')
const cloudinary = require('../middleware/cloudinary')
const { promises, Stream } = require('supertest/lib/test')

const uploadImage =  (fileBuffer)=>{
    return new Promise((resolve, reject) =>{

        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: 'timetable',
                resource_type: 'image'
            }, (error, result)=>{
            if (error) return reject(error)
                resolve(result)
        })
        uploadStream.end(fileBuffer)
    })
}

async function createTableImg(req, res) {
    try {
        if(!req.file){
            return res.status(400).json({message: 'no timetable found'})
        }

        const result = await uploadImage(req.file.buffer)  
        const createdImg = await TimeTable.findOneAndUpdate({owner:req.user._id},
            {
            tableImage: {url: result.secure_url},
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
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message })
        }
        
        res.status(500).json({ message: error.message })

    }
}

async function deleteTableImg(req, res) {

    try {
        const deletedTimeTable = await TimeTable.findOneAndDelete({owner: req.user._id})
        
        if(!deletedTimeTable){
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