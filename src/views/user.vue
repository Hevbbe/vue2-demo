<template>
  <div class="user">
    <h1>用户详情页</h1>
    <div>
      <span>{{ content }}</span>
      &nbsp;
      <button @click="handleContent">修改全局内容</button>
    </div>
    <router-view></router-view>
    <router-link :to="{ name: 'profile' }">查看个人资料</router-link>
  </div>
</template>

<script>
export default {
  name: "User",
  computed: {
    content() {
      return this.$store.state.GlobalContent;
    },
  },
  methods: {
    handleContent() {
      this.$store.commit("handleContent", this.content);
    },
  },
};
</script>
