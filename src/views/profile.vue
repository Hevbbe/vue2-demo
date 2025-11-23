<template>
  <div class="profile">
    <h2>个人资料</h2>
    <p>用户名: {{ userInfo.name }}</p>
    <p>年龄: {{ userInfo.age }}</p>
    <p>邮箱: {{ userInfo.email }}</p>
  </div>
</template>

<script>
import { getUserInfo } from "@/api/user";
export default {
  name: "Profile",
  data() {
    return {
      userInfo: {},
    };
  },
  methods: {
    init() {
      getUserInfo().then((res) => {
        this.userInfo = res.data;
      });
    },
  },
  mounted() {
    this.init();
  },
};
</script>
