<template>
  <div class="dashboard">
    <h1>系统首页</h1>
    <p>欢迎回来，{{ username }}！</p>
    <button @click="handleLogout" class="logout-btn">退出登录</button>
    <div class="nav">
      <!-- 这里的 activeComponent 对应注册的组件名（PascalCase 或 小写都可以，但要一致） -->
      <div class="n-item" :class="{ 'a-item': activeComponent === 'About' }" @click="activeComponent = 'About'">
        前往关于我们
      </div>
      <div class="n-item" :class="{ 'a-item': activeComponent === 'User' }" @click="activeComponent = 'User'">
        查看用户中心
      </div>
    </div>
    <!-- 1. 补全 Transition 动画样式；2. mode="out-in" 在 Vue 2 中有效 -->
    <Transition name="fade" mode="out-in">
      <component :is="activeComponent" key="activeComponent"></component> <!-- 加 key 确保切换时销毁旧组件 -->
    </Transition>
  </div>
</template>

<script>
// 1. 组件导入用 PascalCase（规范）
import About from "./about.vue";
import User from "./user.vue";

export default {
  name: 'Dashboard',
  components: {
    // 2. 注册名用 PascalCase（和导入名一致）
    About,
    User
  },
  data() {
    return {
      username: 'admin',
      activeComponent: 'About', // 3. 初始值对应注册的组件名（PascalCase）
    }
  },
  methods: {
    handleLogout() {
      if (confirm('确定要退出登录吗?')) {
        localStorage.removeItem('isLogin');
        this.$router.push('/login');
      }
    }
  },
  mounted() {
    if (!localStorage.getItem('isLogin')) {
      this.$router.push('/login');
    }
  }
}
</script>

<style scoped>
/* 其他样式不变，新增 Transition 动画样式 */
.dashboard {
  width: 80%;
  margin: 50px auto;
  text-align: center;
}

.logout-btn {
  padding: 8px 16px;
  background: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 20px;
}

.logout-btn:hover {
  background: #d32f2f;
}

.nav {
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

.nav .n-item {
  padding: 10px;
  border-radius: 10px;
  border: 2px solid antiquewhite;
  background-color: antiquewhite;
  transition: .3s;
  cursor: pointer;
}

.nav .a-item {
  color: white;
  border: 2px solid black;
  background-color: black;
}

/* 关键：补全 fade 动画样式（Vue 2/3 通用） */
.fade-enter-active,
.fade-leave-active {
  transition: opacity .3s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>