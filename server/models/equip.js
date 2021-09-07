const mongoose = require('mongoose')

const equipSchema = mongoose.Schema({
  name: String,
  icon: String
})
module.exports = mongoose.model('Equip', equipSchema, 'equips')