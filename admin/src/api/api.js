import axios from './index'

// 添加分类
export async function addCategory (data) {
  return await axios({
    method: 'POST',
    url: '/rest/category/add',
    data
  })
}
// 获取分类
export async function getCategory () {
  return await axios({
    url: '/rest/category',
    method: 'GET'
  })
}
// 根据id获取分类详情
export async function getCategoryById (categoryId) {
  return await axios({
    url: `/rest/category/${categoryId}`,
    method: 'GET'
  })
}
// 修改分类
export async function updateCategory (categoryId, data) {
  return await axios({
    url: `/rest/category/${categoryId}`,
    method: 'PUT',
    data
  })
}
// 删除分类
export async function deleteCategory (categoryId) {
  return await axios({
    url: `/rest/category/${categoryId}`,
    method: 'DELETE'
  })
}
