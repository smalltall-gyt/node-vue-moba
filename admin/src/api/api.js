import axios from './index'

// 添加分类
export async function addCategory (data) {
  return await axios({
    method: 'POST',
    url: '/category/add',
    data
  })
}
// 获取分类
export async function getCategory () {
  return await axios({
    url: '/category',
    method: 'GET'
  })
}
