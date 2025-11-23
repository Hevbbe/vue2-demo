import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./assets/main.scss";

Vue.config.productionTip = false;

// 仅开发环境启用 mock
if (process.env.NODE_ENV === "development") {
  require("./mock");
}

Vue.use(ElementUI);

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");
