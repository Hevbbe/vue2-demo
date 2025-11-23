import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    GlobalContent: '全局内容，任意位置都可进行修改',
  },
  getters: {
  },
  mutations: {
    handleContent(state, content) {
      state.GlobalContent = content
    }
  },
  actions: {
  },
  modules: {
    user
  }
})
