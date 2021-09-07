module.exports = app => {
  const express = require('express')
  const router = express.Router({
    mergeParams: true
  })
  const path = require('path')
  const uploadsPath = path.resolve(__dirname, '../../uploads/')
  const multer = require('multer')
  const storage = multer.diskStorage({
    // 配置上传文件夹的信息
    destination: function (req, file, cb) {
      cb(null, uploadsPath) // 文件存储的文件夹路径,该文件必须存在
    },
    // 修改上传文件的文件名
    filename: function (req, file, cb) {
      // 获取文件的后缀名
      const extname = path.extname(file.originalname)
      cb(null, file.fieldname + '-' + Date.now() + extname)
    }
  })
  const upload = multer({ storage: storage })

  // 添加
  router.post('/add', async (req, res) => {
    const model = await req.Model.create(req.body)
    res.send(model)
  })
  // 获取所有
  router.get('/', async (req, res) => {
    const queryOptions = {}
    if (req.Model.modelName === 'Category') {
      queryOptions.populate = 'parent'
    }
    const data = await req.Model.find({}).setOptions(queryOptions)
    res.send(data)
  })
  // 根据id获取详情
  router.get('/:id', async (req, res) => {
    const data = await req.Model.findById(req.params.id)
    res.send(data)
  })
  // 修改
  router.put('/:id', async (req, res) => {
    const data = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(data)
  })
  // 删除
  router.delete('/:id', async (req, res) => {
    await req.Model.findByIdAndDelete(req.params.id)
    res.send({
      success: true
    })
  })

  app.use('/admin/api/rest/:resource',(req, res, next) => {
    req.Model = require(`../../models/${req.params.resource}`)
    next()
  }, router)

  
  app.post('/admin/api/upload', upload.single('file'), async(req, res) => {
    const file = req.file
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)
  })
}