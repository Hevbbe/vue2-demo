import Vue from "vue";
import VueRouter from "vue-router";

import login from "@/views/login.vue";
import dashboard from "@/views/dashboard.vue";
import about from "@/views/about.vue";
import user from "@/views/user.vue";
import profile from "@/views/profile.vue";
import notFound from "@/views/not-found.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/", redirect: "/login" },

  {
    path: "/login",
    name: "login",
    component: login,
  },
  {
    path: "/about",
    name: "about",
    component: about,
  },

  {
    path: "/dashboard",
    name: "dashboard",
    component: dashboard,
  },

  {
    path: "/user",
    name: "user",
    component: user,
    children: [
      {
        path: "profile",
        name: "profile",
        component: profile,
      },
    ],
  },

  { path: "*", component: notFound },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

router.beforeEach((to, from, next) => {
  const needLoginRoutes = ["/dashboard", "/about", "/user"];
  const needLogin = needLoginRoutes.some((route) => to.path.startsWith(route));

  if (needLogin) {
    const isLogin = localStorage.getItem("token");
    if (isLogin) {
      next();
    } else {
      next("/login");
    }
  } else {
    next();
  }
});

export default router;
