<template>
  <div class="dashboard">
    <h1>系统首页</h1>
    <p>欢迎回来，{{ username }}！</p>
    <button @click="handleLogout" class="logout-btn">退出登录</button>
    <div class="carousel">
      <el-carousel class="bg-orange" trigger="click" height="150px">
        <el-carousel-item
          height="150px"
          v-for="item in list.list"
          :key="item.id"
        >
          <h3 class="medium">{{ item.desc }}</h3>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="nav">
      <div
        class="n-item"
        :class="{ 'a-item': activeComponent === 'About' }"
        @click="activeComponent = 'About'"
      >
        前往关于我们
      </div>
      <div
        class="n-item"
        :class="{ 'a-item': activeComponent === 'User' }"
        @click="activeComponent = 'User'"
      >
        查看用户中心
      </div>
    </div>
    <Transition name="fade" mode="out-in">
      <component :is="activeComponent" key="activeComponent"></component>
    </Transition>
  </div>
</template>

<script>
import About from "./about.vue";
import User from "./user.vue";
import { removeToken, getToken } from "../utils";
import { getCarousel } from "../api/list";

export default {
  name: "Dashboard",
  components: {
    About,
    User,
  },
  data() {
    return {
      username: "admin",
      activeComponent: "About",
      list: [],
    };
  },
  methods: {
    init() {
      getCarousel({ count: 3 }).then((res) => {
        console.log(res);
        this.list = res;
      });
    },
    handleLogout() {
      if (confirm("确定要退出登录吗?")) {
        removeToken("token");
        this.$router.push("/login");
      }
    },
  },
  created() {
    this.init();
  },
  mounted() {
    if (!getToken("token")) {
      this.$router.push("/login");
    }
  },
};
</script>

<style scoped>
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
  transition: 0.3s;
  cursor: pointer;
}

.nav .a-item {
  color: white;
  border: 2px solid black;
  background-color: black;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
