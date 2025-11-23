import Vue from "vue";
import VueRouter from "vue-router";

import login from "../views/login.vue";
import dashboard from "../views/dashboard.vue";
import about from "../views/about.vue";
import user from "../views/user.vue";
import profile from "../views/profile.vue";
import notFound from "../views/not-found.vue";

Vue.use(VueRouter);

const routes = [
  // 重定向：默认访问 / 时跳转到 /login
  { path: "/", redirect: "/login" },

  // 普通路由：path 对应 URL 路径，component 对应渲染的组件
  {
    path: "/login",
    name: "login", // 路由名称（可选，用于编程式导航）
    component: login,
  },
  {
    path: "/about",
    name: "about",
    component: about,
  },

  // 登录后的首页（需要登录才能访问）
  {
    path: "/dashboard",
    name: "dashboard",
    component: dashboard,
    meta: {
      requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
    },
  },

  // 动态路由：路径带参数（:id 为参数，可通过 $route.params.id 获取）
  {
    path: "/user", // 例如 /user/123、/user/456
    name: "user",
    component: user,
    // 嵌套路由：父路由下的子路由
    children: [
      {
        path: "profile", // 子路由路径无需加 /（最终路径：/user/:id/profile）
        name: "profile",
        component: profile,
      },
    ],
  },

  // 404 路由：匹配所有未定义的路径（必须放在最后！）
  { path: "*", component: notFound },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

// 路由守卫：全局前置守卫（控制登录权限）
router.beforeEach((to, from, next) => {
  // 需要登录才能访问的路由列表
  const needLoginRoutes = ["/dashboard", "/about", "/user"];
  // 判断当前路由是否需要登录
  const needLogin = needLoginRoutes.some((route) => to.path.startsWith(route));

  if (needLogin) {
    // 检查本地存储的登录状态
    const isLogin = localStorage.getItem("token");
    if (isLogin) {
      next(); // 已登录，放行
    } else {
      next("/login"); // 未登录，跳转到登录页
    }
  } else {
    next(); // 不需要登录的路由（如 /login、404）直接放行
  }
});

export default router;
