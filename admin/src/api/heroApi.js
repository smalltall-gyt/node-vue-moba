import axios from './index'

// 添加英雄
export async function addHero (data) {
  return await axios({
    method: 'POST',
    url: '/rest/hero/add',
    data
  })
}
// 删除英雄
export async function deleteHero (heroId) {
  return await axios({
    url: `/rest/hero/${heroId}`,
    method: 'DELETE'
  })
}
// 获取所有英雄
export async function getHero () {
  return await axios({
    url: '/rest/hero',
    method: 'GET'
  })
}
// 修改英雄
export async function updateHero (heroId, data) {
  return await axios({
    url: `/rest/hero/${heroId}`,
    method: 'PUT',
    data
  })
}
// 根据id获取英雄
export async function getHeroById (heroId) {
  return await axios({
    url: `/rest/hero/${heroId}`,
    method: 'GET'
  })
}
// 获取英雄分类
export async function getHeroCategories () {
  return await axios({
    url: '/rest/category',
    method: 'GET'
  })
}
