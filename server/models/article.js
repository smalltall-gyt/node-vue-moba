const mongoose = require('mongoose')

const articleSchema = mongoose.Schema({
  title: {
    type: String
  },
  categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category'
    }
  ],
  body: {
    type: String
  }
})
module.exports = mongoose.model('Article', articleSchema, 'articles')