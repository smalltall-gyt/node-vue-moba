import axios from './index'

export async function addAdmin (data) {
  return await axios({
    url: '/rest/admin/add',
    method: 'POST',
    data
  })
}
export async function deleteAdmin (adminId) {
  return await axios({
    url: `/rest/admin/${adminId}`,
    method: 'DELETE'
  })
}
export async function getAdmin () {
  return await axios({
    url: '/rest/admin',
    method: 'GET'
  })
}
export async function getAdminById (adminId) {
  return await axios({
    url: `/rest/admin/${adminId}`,
    method: 'GET'
  })
}
export async function updateAdmin (adminId, data) {
  return await axios({
    url: `/rest/admin/${adminId}`,
    method: 'PUT',
    data
  })
}
