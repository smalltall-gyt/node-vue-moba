module.exports = app => {
  const express = require('express')
  const router = express.Router()
  const categoryModel = require('../../models/category')

  router.post('/category/add', async (req, res) => {
    const model = await categoryModel.create(req.body)
    res.send(model)
  })

  router.get('/category', async (req, res) => {
    const data = await categoryModel.find({})
    console.log(data);
    res.send(data)
  })

  app.use('/admin/api', router)
}