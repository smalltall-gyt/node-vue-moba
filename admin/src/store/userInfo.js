export default {
  namespaced: true,
  state: {
    user_token: localStorage.getItem('user_token') || ''
  },
  mutations: {
    setUserToken (state, payload) {
      localStorage.setItem('user_token', payload)
      state.user_token = payload
    }
  },
  actions: {
    asyncSetUserToken (context, payload) {
      context.commit('setUserToken', payload)
    }
  }
}
