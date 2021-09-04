const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
  name: String,
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  }
})
module.exports = mongoose.model('Category', categorySchema, 'categories')