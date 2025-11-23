<template>
  <div class="user">
    <h1>用户详情页</h1>
    <div>
      <span>{{ content }}</span>&nbsp;
      <button @click="handleContent">修改全局内容</button>
    </div>
    <router-view></router-view>
    <router-link :to="{ name: 'profile' }">
      查看个人资料
    </router-link>
  </div>
</template>

<script>
import { getGlobalContent, setGlobalContent } from "../utils/store"
export default {
  name: 'User',
  data() {
    return {}
  },
  computed: {
    content() {
      return getGlobalContent()
    }
  },
  methods: {
    handleContent() {
      setGlobalContent('新修改的内容')
    }
  }
}
</script>