const express = require('express')
const app = express()
app.use(require('cors')()) // 解决跨域
app.use(express.json())
require('./plugins/db')(app)
require('./routes/admin')(app)
app.listen(3000)