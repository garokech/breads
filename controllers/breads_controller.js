const express = require('express')
const breads = express.Router()
const Bread = require('../models/bread.js')

// INDEX
breads.get('/', (req, res) => {
  Bread.find()
      .then(foundBreads => {
          res.render('Index', {
              breads: foundBreads,
              title: 'Index Page'
          })
      })
})
// CREATE
breads.post('/', (req, res) => {
  if(!req.body.image) {
      req.body.image = undefined 
  }
  if(req.body.hasGluten === 'on') {
    req.body.hasGluten = true
  } else {
    req.body.hasGluten = false
  }
  Bread.create(req.body)
  res.redirect('/breads')
})

// NEW
breads.get('/new', (req, res) => {
  res.render('new')
})

// EDIT
breads.get('/:indexArray/edit', (req, res) => {
  res.render('edit', {
    bread: Bread[req.params.indexArray],
    index: req.params.indexArray
  })
})

// SHOW
breads.get('/:id', (req, res) => {
  Bread.findById(req.params.id)
   .then(foundBread => {
     res.render('show', {
       bread: foundBread
    })
  })
  .catch(err => {
    res.render('error404')
  })
})

// UPDATE
breads.put('/:arrayIndex', (req, res) => {
  if(req.body.hasGluten === 'on'){
    req.body.hasGluten = true
  } else {
    req.body.hasGluten = false
  }
  // Bread[req.params.arrayIndex] = req.body
  Bread.findByIdAndUpdate(req.params.arrayIndex, req.body,{new:true})
  .then(updatedBread =>{
    console.log(updatedBread)
    res.redirect(`/breads/${req.params.arrayIndex}`)
  })
})

// DELETE
breads.delete('/:indexArray', (req, res) => {
  Bread.findByIdAndDelete(req.params.indexArray)
  .then(deletedBread => {
  res.status(303).redirect('/breads')
  })
})
  module.exports = breads


  