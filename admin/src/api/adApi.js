import axios from './index'

// 新增广告位
export async function addAd (data) {
  return await axios({
    url: '/rest/advertisement/add',
    method: 'POST',
    data
  })
}
// 删除广告位
export async function deleteAd (adId) {
  return await axios({
    url: `/rest/advertisement/${adId}`,
    method: 'DELETE'
  })
}
// 获取广告位
export async function getAd () {
  return await axios({
    url: '/rest/advertisement',
    method: 'GET'
  })
}
// 修改广告位
export async function updateAd (adId, data) {
  return await axios({
    url: `/rest/advertisement/${adId}`,
    method: 'PUT',
    data
  })
}
// 根据id获取广告位
export async function getAdById (adId) {
  return await axios({
    url: `/rest/advertisement/${adId}`,
    method: 'GET'
  })
}
