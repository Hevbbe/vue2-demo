import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    GlobalContent: "全局内容，任意位置都可进行修改",
    token: "",
  },
  mutations: {
    handleContent(state, content) {
      state.GlobalContent = content;
    },
    setToken(state, token) {
      state.token = token;
    },
  },
  getters: {
    token(state) {
      return state.token;
    },
  },
  actions: {
    saveToken({ commit }, token) {
      commit("setToken", token);
    },
  },
  modules: {},
});
