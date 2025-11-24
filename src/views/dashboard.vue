<template>
  <div class="dashboard">
    <el-container>
      <el-header>
        <div class="flex align-center justify-between">
          <h1>系统首页</h1>
          <div class="flex align-center">
            <p>欢迎回来，{{ username }}！</p>
            <el-button type="danger" size="small" @click="handleLogout">
              退出登录
            </el-button>
          </div>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px" class="bg-grey">Aside</el-aside>
        <el-container>
          <el-main>
            <CommonOption v-model="carouselCount" @input="handleSelectChange" />
            <el-carousel trigger="click">
              <el-carousel-item v-for="item in list.list" :key="item.id">
                <h3 class="medium">{{ item.desc }}</h3>
              </el-carousel-item>
            </el-carousel>
          </el-main>
          <el-footer height="auto">
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
              <component :is="activeComponent" key="activeComponent" />
            </Transition>
          </el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import About from "./about.vue";
import User from "./user.vue";
import { removeToken, getToken } from "../utils";
import { getCarousel } from "../api/list";
import CommonOption from "@/components/common-option/index.vue";

export default {
  name: "Dashboard",
  components: {
    About,
    User,
    CommonOption,
  },
  data() {
    return {
      username: "admin",
      activeComponent: "About",
      list: [],
      carouselCount: 5,
    };
  },
  methods: {
    init() {
      getCarousel({ count: this.carouselCount }).then((res) => {
        this.list = res;
      });
    },
    handleLogout() {
      if (confirm("确定要退出登录吗?")) {
        removeToken("token");
        this.$router.push("/login");
      }
    },
    handleSelectChange(val) {
      this.carouselCount = val;
      this.init();
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
  margin: 0 auto;
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

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
