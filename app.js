const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
require('dotenv').config({ path: './.env' })

const weatherRoute = require('./routes/weather')

const app = express()

// Set view engine
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }))

// Middleware routes
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', weatherRoute)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`)
})