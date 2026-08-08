// imports
const express = require("express") //importing express package
const app = express() // creates a express application
const dotenv = require("dotenv").config() //this allows me to use my .env values in this file
const morgan = require('morgan')
const cors = require('cors')

// Routes Import
const authRoutes = require('./routes/auth.routes')
const sessionRoutes = require('./routes/session.routes')
const timetableRoutes = require('./routes/timeTable.routes')
const courseRoutes = require('./routes/course.routes')
// Middleware
app.use(
    cors({
        origin: process.env.CLIENT_URL || 'http://localhost:5173',
    })
);
app.use(express.json())
app.use(morgan('dev'))



// Routes
app.use('/auth',authRoutes)
app.use('/sessions', sessionRoutes)
app.use('/timetable', timetableRoutes)
app.use('/courses', courseRoutes)

module.exports = app