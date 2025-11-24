import axios from "axios";
import { getToken } from "@/utils";

const service = axios.create({
  baseURL: "",
  timeout: 5000,
});

// 请求拦截器：自动携带token
service.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

// 响应拦截器：统一错误处理
service.interceptors.response.use(
  (res) => {
    const data = res.data;
    if (data.code === 401) {
      alert("登录过期，请重新登录");
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
