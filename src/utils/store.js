// utils/store.js
import store from '@/store'

// 获取用户信息
export const getUserInfo = () => {
  return store.state.user.userInfo
}

// 设置用户信息（mutation）
export const setUserInfo = (info) => {
  store.commit('user/SET_INFO', info)
}

// 更新用户信息（action）
export const updateUserInfo = (info) => {
  return store.dispatch('user/updateUser', info)
}

// 获取全局内容
export const getGlobalContent = () => {
  return store.state.GlobalContent
}

// 设置全局内容
export const setGlobalContent = (content) => {
  store.commit('handleContent', content)
}
