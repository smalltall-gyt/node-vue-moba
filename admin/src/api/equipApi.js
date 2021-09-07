import axios from './index'

// 添加装备
export async function addEquip (data) {
  return await axios({
    method: 'POST',
    url: '/rest/equip/add',
    data
  })
}
// 获取装备
export async function getEquip () {
  return await axios({
    url: '/rest/equip',
    method: 'GET'
  })
}
// 根据id获取装备详情
export async function getEquipById (equipId) {
  return await axios({
    url: `/rest/equip/${equipId}`,
    method: 'GET'
  })
}
// 修改装备
export async function updateEquip (equipId, data) {
  return await axios({
    url: `/rest/equip/${equipId}`,
    method: 'PUT',
    data
  })
}
// 删除装备
export async function deleteEquip (equipId) {
  return await axios({
    url: `/rest/equip/${equipId}`,
    method: 'DELETE'
  })
}
