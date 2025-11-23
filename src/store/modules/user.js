const state = {
  userInfo: {}
}

const mutations = {
  SET_INFO(state, info) {
    state.userInfo = info
  }
}

const actions = {
  updateUser({ commit }, info) {
    commit('SET_INFO', info)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}