const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const adminSchema = mongoose.Schema({
  username: { type: String },
  password: { 
    type: String,
    select: false,
    set (data) {
      return bcrypt.hashSync(data, 10)
    }
  }
})
module.exports = mongoose.model('Admin', adminSchema, 'admins')