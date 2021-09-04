module.exports = app => {
  const express = require('express')
  const router = express.Router({
    mergeParams: true
  })


  // 添加分类
  router.post('/add', async (req, res) => {
    const model = await req.Model.create(req.body)
    res.send(model)
  })
  // 获取所有分类
  router.get('/', async (req, res) => {
    const queryOptions = {}
    if (req.Model.modelName === 'Category') {
      queryOptions.populate = 'parent'
    }
    const data = await req.Model.find({}).setOptions(queryOptions)
    res.send(data)
  })
  // 根据id获取分类详情
  router.get('/:id', async (req, res) => {
    const data = await req.Model.findById(req.params.id)
    res.send(data)
  })
  // 修改分类
  router.put('/:id', async (req, res) => {
    const data = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(data)
  })
  // 删除分类
  router.delete('/:id', async (req, res) => {
    await req.Model.findByIdAndDelete(req.params.id)
    res.send({
      success: true
    })
  })

  app.use('/admin/api/:resource',(req, res, next) => {
    req.Model = require(`../../models/${req.params.resource}`)
    next()
  }, router)
}