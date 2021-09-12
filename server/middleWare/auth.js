const assert = require('http-assert')
const jwt = require('jsonwebtoken')
const admin = require('../models/admin')

module.exports = (options) => {
  return async (req, res, next) => {
    // 中间件 获取前端传递过来的token
    const token = String(req.headers.authorization || '').split(' ').pop()
    assert(token, 401, '请先登录') // 请提供jwt token
    const tokenData = jwt.verify(token, req.app.get('secret'))
    const userId = tokenData.id
    assert(userId, 401, '请先登录') // 无效的jwt token
    req.user = await admin.findById(userId)
    assert(req.user, 401, '请先登录')
    await next()
  }
}