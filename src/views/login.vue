<template>
  <div class="login-container">
    <h1>用户登录</h1>
    <form @submit.prevent="handleLogin">
      <div class="form-item">
        <label>用户名：</label>
        <input
          type="text"
          v-model="username"
          placeholder="请输入用户名"
          required
        />
      </div>
      <div class="form-item">
        <label>密码：</label>
        <input
          type="password"
          v-model="password"
          placeholder="请输入密码"
          required
        />
      </div>
      <button type="submit" :disabled="isLoading" class="login-btn">
        登录
      </button>
      <p class="error-message" v-if="errorMsg">{{ errorMsg }}</p>
    </form>
  </div>
</template>

<script>
import { setToken } from "../utils";
import { login } from "@/api/login";
import store from "@/store";
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      errorMsg: "",
      isLoading: false,
    };
  },
  methods: {
    async handleLogin() {
      this.isLoading = true;

      try {
        const params = {
          username: this.username,
          password: this.password,
        };

        const res = await login(params);

        if (res.code !== 200) {
          this.errorMsg = res.message || "登录失败";
          setTimeout(() => (this.errorMsg = ""), 3000);
          return;
        }

        const token = res.data.token;
        setToken(token);
        store.dispatch("saveToken", token);

        this.$router.replace("/dashboard");
      } catch (err) {
        console.error("登录失败：", err);
        this.errorMsg = "服务器错误，请稍后重试";
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  width: 350px;
  margin: 100px auto;
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 8px;
  text-align: center;
}

.form-item {
  margin: 15px 0;
  text-align: left;
  display: flex;
  flex-direction: column;
}

input {
  outline: none;
  padding: 8px;
  margin-top: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.login-btn {
  width: 100%;
  padding: 10px;
  background: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
}

.login-btn:disabled {
  background-color: #737675;
}

.login-btn:hover {
  background: #359469;
}

.error-message {
  color: red;
  margin-top: 10px;
  font-size: 14px;
}
</style>
