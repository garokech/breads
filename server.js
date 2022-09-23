// DEPENDENCIES
const express = require('express')
const mongoose = require('mongoose')

// CONFIGURATION
require('dotenv').config()
const PORT = process.env.PORT
const app = express()

// MIDDLEWARE
app.use(express.static('public'))
app.set('views', __dirname + '/views')
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())
app.use(express.urlencoded({extended: true}))
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true}, 
  () => { console.log('connected to mongo: ', process.env.MONGO_URI) }
)



// ROUTES
app.get('/', (req, res) => {
  res.send('Welcome to an Awesome App about Breads!')
})

//BREADS
const breadsController = require ('./controllers/breads_controller.js')
app.use('/breads', breadsController)

// LISTEN
app.listen(PORT, () => {
  console.log('listening on port', PORT);
})

// 404 Page
app.get('*', (req, res) => {
  res.send('404')
})


