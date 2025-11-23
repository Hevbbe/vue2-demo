const state = {
  token: '',
  userInfo: null
}

const mutations = {
  SET_TOKEN(state, token) {
    state.token = token
  },
  SET_USER_INFO(state, info) {
    state.userInfo = info
  },
  CLEAR_USER(state) {
    state.token = ''
    state.userInfo = null
  }
}

const actions = {
  saveUser({ commit }, data) {
    commit('SET_TOKEN', data.token)
    commit('SET_USER_INFO', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
