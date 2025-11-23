import axios from "axios";
import store from "@/store";

const service = axios.create({
  baseURL: "",
  timeout: 5000,
});

// 请求拦截器：自动携带 token
service.interceptors.request.use((config) => {
  const token = store.state.user.token;
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

// 响应拦截器：统一错误处理
service.interceptors.response.use(
  (res) => {
    const data = res.data;
    // token 过期
    if (data.code === 401) {
      alert("登录过期，请重新登录");
      store.commit("user/CLEAR_USER");
      return Promise.reject(data);
    }
    return data;
  },
  (error) => {
    console.error("请求错误", error);
    return Promise.reject(error);
  }
);

export default service;
