import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from '@/store/index'

Vue.use(VueRouter)

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  if (to.meta.isPublic) {
    next()
  } else {
    // 需要鉴权
    if (store.state.userInfo.user_token) {
      next()
    } else {
      Vue.prototype.$message({
        type: 'error',
        message: '请先登录'
      })
      next({
        name: 'login',
        query: {
          returnPath: router.currentRoute.fullPath
        }
      })
    }
  }
})
export default router
