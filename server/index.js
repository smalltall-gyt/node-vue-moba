const express = require('express')
const app = express()
app.use(require('cors')()) // 解决跨域
app.use(express.json())
app.use(express.static(__dirname + '/uploads'))
app.set('secret', 'smalltall')
require('./plugins/db')(app)
require('./routes/admin')(app)
app.listen(3000)