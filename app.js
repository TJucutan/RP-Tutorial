const express = require('express')
const app = express()
var exphbs = require('express-handlebars')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/rotten-potatoes', { useNewUrlParser: true, useUnifiedTopology: true });

app.engine('handlebars', exphbs({ defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

// app.get('/', (req, res) => {
//     res.render('home', { msg: 'Handlebars are Cool!'})
// })

const Reveiw = mongoose.model('Review', {
    title: String,
    movieTitle: String
})

// let reviews = [
//     { title: "Great Review", movieTitle: "Batman II"},
//     { title: "Awesome Movie", movieTitle: "Titanic"},
//     { title: "Best movie ever!", movieTitle: "ZSJL"}
// ]

app.get('/', (req, res) => {
    Reveiw.find()
        .then(reviews => {
            res.render('reviews-index', { reviews: reviews })
        })
        .catch(err => {
            console.log(err)
        })
})

app.listen(3000, () => {
    console.log('App listening on port 3000!')
})