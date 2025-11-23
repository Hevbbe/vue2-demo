<template>
  <div class="user">
    <h1>用户详情页</h1>
    <div>
      <span>{{ content }}</span>&nbsp;
      <button @click="handleContent">修改全局内容</button>
    </div>
    <router-link :to="{ name: 'profile' }">
      查看个人资料
    </router-link>
  </div>
</template>

<script>
import { getUserInfo, setUserInfo } from '../utils/store';
export default {
  name: 'User',
  data() {
    return {}
  },
  created() {
    setUserInfo({ name: 'he', age: 18, gender: 1 })
    const userInfo = getUserInfo()

    // this.$store.commit('user/SET_INFO', { name: 'he', age: 18, gender: 1 })
    // const userInfo = this.$store.state.user.userInfo

    console.log(userInfo, '获取用户信息')
  },
  computed: {
    content() {
      return this.$store.state.GlobalContent
    }
  },
  methods: {
    handleContent() {
      this.$store.commit('handleContent', '新修改的内容')
    }
  }
}
</script>