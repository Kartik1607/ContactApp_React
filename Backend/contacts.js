const mongoose = require('mongoose')
const colors = require('colors/safe')
let contactSchema = mongoose.Schema({
  name: String,
  mobileOffice: Number,
  mobilePersonal: Number,
  address: String,
  image: String
})

const ContactModel = mongoose.model('Contact', contactSchema)

function findAll(error, success) {
  ContactModel.find((err, contacts) => {
    if (err) {
      error()
    } else {
      success(contacts)
    }
  })
}

function findById(id, error, success) {
  ContactModel.findById(id, (err, contact) => {
    if (err) {
      error(err)
    } else {
      success(contact)
    }
  })
}

function save(model, error, success) {
  let contact = new ContactModel(model)
  contact.save((err, contact) => {
    if (err) {
      error(err)
    } else {
      success(contact)
    }
  })
}

function updateById(id, model, error, success) {
  ContactModel.findByIdAndUpdate(id, model, (err, contact) => {
    if (err) {
      error(err)
    } else {
      success(contact)
    }
  })
}

module.exports = {
  findAll: findAll,
  save: save,
  findById: findById,
  updateById: updateById
}
