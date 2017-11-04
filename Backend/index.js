const express = require('express')
const path = require('path')
const app = express()
const mongoose = require('mongoose')
const Contact = require('./contacts')
const constants = require('./constants')
const colors = require('colors/safe')
const bodyParser = require('body-parser')
const imageService = require('./imageService')
imageService(app)

mongoose.connect(constants.mongoURL)
const db = mongoose.connection
db.on('error', console.error.bind(console, colors.red('connection error:')))
db.once('open', () => {
  console.log(colors.green('Connceted to MongoDB. YAY'))
})

app.use('/', express.static(path.join(__dirname, '../public')))
app.use(bodyParser.json())
app.listen(constants.PORT, () => {
  console.log(colors.green('Node started'))
})

app.get('/contacts', (req, res) => {
  Contact.findAll(() => {

  }, (contacts) => {
    res.send(contacts)
  })
})

app.post('/contacts', (req, res) => {
  Contact.save(req.body, (err) => {
    console.log(colors.red(err))
  }, (contact) => {
    res.send(contact)
  })
})

app.get('/contacts/:id', (req, res) => {
  Contact.findById(req.params.id, (err) => {
    console.log(colors.red(err))
  }, (contact) => {
    res.send(contact)
  })
})

app.put('/contacts/:id', (req, res) => {
  Contact.updateById(req.params.id, req.body, (err) => {
    console.log(colors.red(err))
  }, (contact) => {
    res.send(contact)
  })
})
