import axios from './index'

// 添加文章
export async function addArticle (data) {
  return await axios({
    url: '/rest/article/add',
    method: 'POST',
    data
  })
}
// 修改文章
export async function updateArticle (articleId, data) {
  return await axios({
    url: `/rest/article/${articleId}`,
    method: 'PUT',
    data
  })
}
// 删除文章
export async function deleteArticle (articleId) {
  return await axios({
    url: `/rest/article/${articleId}`,
    method: 'DELETE'
  })
}
// 获取文章
export async function getArticle () {
  return await axios({
    url: '/rest/article',
    method: 'GET'
  })
}
// 根据id获取文章
export async function getArticleById (articleId) {
  return await axios({
    url: `/rest/article/${articleId}`,
    method: 'GET'
  })
}
// 处理文章编辑时图片上传的问题
export async function uploadImages (data) {
  return await axios({
    url: '/upload',
    method: 'POST',
    data
  })
}
