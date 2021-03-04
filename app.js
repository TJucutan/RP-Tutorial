const express = require('express')
const app = express()
const Review = require('./models/review')
const reviews = require('./controllers/reviews')(app, Review)

app.listen(3000, () => {
    console.log('App listening on port 3000!')
})

module.exports = app