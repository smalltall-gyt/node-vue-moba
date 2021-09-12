import axios from 'axios'
import Vue from 'vue'
import store from '@/store/index'
import router from '@/router/index'

const instance = axios.create({
  baseURL: 'http://localhost:3000/admin/api'
})
instance.interceptors.request.use((config) => {
  if (store.state.userInfo.user_token) {
    config.headers.Authorization = 'Bearer ' + store.state.userInfo.user_token
  }
  return config
}, (error) => {
  return error
})
instance.interceptors.response.use((res) => {
  return res
}, (error) => {
  if (error.response.data.message) {
    Vue.prototype.$message({
      message: error.response.data.message,
      type: 'error'
    })
  }
  if (error.response.status === 401) {
    router.replace({
      name: 'login',
      query: {
        returnPath: router.currentRoute.fullPath
      }
    })
  }
  return error
})
export default instance
