<template>
  <div class="profile">
    <h2>个人资料</h2>
    <p>用户名：Vue 学习者</p>
    <p>邮箱：vue@demo.com</p>
    {{ userInfo }}
  </div>
</template>

<script>
import store from '../store/modules/user';
export default {
  name: 'Profile',
  data() {
    return {
      list: []
    }
  },
  created() {
    store.commit('SET_INFO', { name: 'he', age: 18, gender: 1 })
    const userInfo = store.state.userInfo;
    console.log(userInfo, 'userInfo');
  }
}
</script>