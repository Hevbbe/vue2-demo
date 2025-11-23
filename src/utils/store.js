// utils/store.js
import store from '@/store'

// 获取全局内容
export const getGlobalContent = () => {
  return store.state.GlobalContent
}

// 设置全局内容
export const setGlobalContent = (content) => {
  store.commit('handleContent', content)
}
