const Review = require('../models/review')
const _handlebars = require('handlebars')
var exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')
const methodOverride = require('method-override')

module.exports = function(app, Review) {
  app.use(bodyParser.urlencoded({ extended: true}))
  mongoose.connect('mongodb://localhost/rotten-potatoes', { useNewUrlParser: true, useUnifiedTopology: true }); 

// override with POST having ?_method=DELETE or ?_method=PUT
app.use(methodOverride('_method'))

app.engine('handlebars', exphbs({ 
    defaultLayout: 'main',
    handlebars: allowInsecurePrototypeAccess(_handlebars)
}))

app.set('view engine', 'handlebars')

  app.get('/', (req, res) => {
    Review.find()
      .then(reviews => {
        res.render('reviews-index', {reviews: reviews});
      })
      .catch(err => {
        console.log(err);
      });
  });

// NEW
app.get('/reviews/new', (req,res) => {
    res.render('reviews-new', {title: "New Review"})
})

// Create
app.post('/reviews', (req,res) => {
    Review.create(req.body).then((review) => {
        console.log(review)
        res.redirect(`/reviews/${review._id}`)
    }).catch((err) => {
        console.log(err.message)
    })
})

app.get('/reviews/:id', (req, res) => {
    Review.findById(req.params.id).lean()
    .then((review) => {
        res.render('reviews-show', { review: review })
    }).catch((err) => {
        console.log(err.message)
    })
})

// EDIT
app.get('/reviews/:id/edit', (req, res) => {
    Review.findById(req.params.id, function(err, review) {
      res.render('reviews-edit', {review: review, title: "Edit Review"});
    })
  })

//UPDATE
app.put('/reviews/:id', (req, res) => {
    Review.findByIdAndUpdate(req.params.id, req.body)
      .then(review => {
        res.redirect(`/reviews/${review._id}`)
      })
      .catch(err => {
        console.log(err.message)
      })
  })

  // DELETE
app.delete('/reviews/:id', function (req, res) {
    console.log("DELETE review")
    Review.findByIdAndRemove(req.params.id).then((review) => {
      res.redirect('/');
    }).catch((err) => {
      console.log(err.message);
    })
  })


}
