const express = require('express')
const app = express()
var exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true}))
mongoose.connect('mongodb://localhost/rotten-potatoes', { useNewUrlParser: true, useUnifiedTopology: true });

app.engine('handlebars', exphbs({ defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

// app.get('/', (req, res) => {
//     res.render('home', { msg: 'Handlebars are Cool!'})
// })

const Reveiw = mongoose.model('Review', {
    title: String,
    description: String,
    movieTitle: String,
    rating: Number
})

// let reviews = [
//     { title: "Great Review", movieTitle: "Batman II"},
//     { title: "Awesome Movie", movieTitle: "Titanic"},
//     { title: "Best movie ever!", movieTitle: "ZSJL"}
// ]

app.get('/', (req, res) => {
    Reveiw.find().lean()
        .then(reviews => {
            res.render('reviews-index', { reviews: reviews })
        })
        .catch(err => {
            console.log(err)
        })
})

app.get('/reviews/new', (req,res) => {
    res.render('reviews-new', {})
})

//Create
app.post('/reviews', (req,res) => {
    Reveiw.create(req.body).then((review) => {
        console.log(review)
        res.redirect(`/reviews/${review._id}`)
    }).catch((err) => {
        console.log(err.message)
    })
})

app.get('/reviews/:id', (req, res) => {
    Reveiw.findById(req.params.id).lean()
    .then((review) => {
        res.render('reviews-show', { review: review })
    }).catch((err) => {
        console.log(err.message)
    })
})

app.listen(3000, () => {
    console.log('App listening on port 3000!')
})