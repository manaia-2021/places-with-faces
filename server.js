const express = require('express')
const path = require('path')
const hbs = require('express-handlebars')
const { getPlaces, addPlace } = require('./utils')

const server = express()

// Server Config
server.use(express.static(path.join(__dirname, 'public')))
server.use(express.urlencoded({ extended: false }))

// Handlebars Middleware
server.engine('hbs', hbs({ extname: 'hbs' }))
server.set('view engine', 'hbs')

// Routes
server.get('/', (req, res) => {
  getPlaces((err, places) => {
    if (err) {
      res.send(err.message)
    }
    const viewData = places
    res.render('home', viewData)
  })
})

server.get('/places/add', (req, res) => {
  res.render('add')
})

server.post('/places/add', (req, res) => {
  const newPlace = req.body
  addPlace(newPlace, (err, newId) => {
    if (err) {
      res.send(err.message)
    }
    res.redirect(`/places/${newId}`)
  })
})

server.get('/places/:id', (req, res) => {
  getPlaces((err, placeData) => {
    if (err) {
      res.send(err.message)
    }
    const viewData = placeData.places.find(place => place.id === parseInt(req.params.id))
    res.render('details', viewData)
  })
})

module.exports = server
