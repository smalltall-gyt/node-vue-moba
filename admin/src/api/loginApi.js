import axios from './index'

export async function login (data) {
  return await axios({
    url: '/login',
    method: 'POST',
    data
  })
}
