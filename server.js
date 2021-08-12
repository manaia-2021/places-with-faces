const express = require('express')
const path = require('path')
const hbs = require('express-handlebars')

const server = express()

// Server Config
server.use(express.static(path.join(__dirname, 'public')))
// server.use(express.urlencoded({ extended: false }))

// Handlebars Middleware
server.engine('hbs', hbs({ extname: 'hbs' }))
server.set('view engine', 'hbs')

// Routes
server.get('/', (req, res) => {
  res.render('home')
})

module.exports = server