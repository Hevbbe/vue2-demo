<template>
  <div class="login-container">
    <h1>用户登录</h1>
    <form @submit.prevent="handleLogin">
      <div class="form-item">
        <label>用户名：</label>
        <input type="text" v-model="username" placeholder="请输入用户名" required>
      </div>
      <div class="form-item">
        <label>密码：</label>
        <input type="password" v-model="password" placeholder="请输入密码" required>
      </div>
      <!-- 按钮添加禁用状态和倒计时文本 -->
      <button type="submit" class="login-btn" :disabled="isBtnDisabled">
        登录
      </button>
      <pre v-if="isCounting">{{ result.message }} {{ count }}秒后跳转...</pre>
      <p class="error-message" v-if="errorMsg">{{ errorMsg }}</p>
    </form>
  </div>
</template>

<script>
import { login, getUserInfo, checkToken } from '@/api/user'
import store from '@/store'
export default {
  name: 'Login',
  data() {
    return {
      username: '', // 用户名绑定
      password: '', // 密码绑定
      errorMsg: '',  // 错误提示
      result: '',
      count: 3, // 跳转倒计时秒数
      timer: null,
      isCounting: false, // 控制跳转倒计时显示状态
      defaultCount: 3, // 默认跳转倒计时秒数
      isBtnDisabled: false, // 按钮禁用状态
      btnCount: 3, // 按钮禁用倒计时秒数
      btnTimer: null // 按钮定时器
    }
  },
  methods: {
    getData() {
      getUserInfo().then(res => {
        this.result = res
      })
      checkToken().then(res => {
        this.result = res
      })
    },
    handleLogin() {
      // 如果按钮已禁用，直接返回（防止重复提交）
      if (this.isBtnDisabled) return;

      if (this.username === 'admin' && this.password === '123456') {
        // 登录成功时：禁用按钮3秒 + 启动跳转倒计时
        this.disableBtnForSeconds();

        const params = {
          username: this.username,
          password: this.password
        }
        login(params).then(res => {
          store.dispatch('user/saveUser', res.data)
          this.result = res
          this.startJumpCountdown() // 启动跳转倒计时
        })
      } else {
        // 登录失败时：也禁用按钮3秒（防止频繁点击）
        this.disableBtnForSeconds();

        this.errorMsg = '用户名或密码错误（正确：admin/123456）';
        setTimeout(() => {
          this.errorMsg = '';
        }, 3000);
      }
    },
    // 按钮禁用3秒的方法
    disableBtnForSeconds() {
      this.isBtnDisabled = true; // 禁用按钮
      this.btnCount = 3; // 重置按钮倒计时为3秒

      // 清除之前的按钮定时器
      if (this.btnTimer) {
        clearInterval(this.btnTimer);
      }

      // 启动按钮倒计时
      this.btnTimer = setInterval(() => {
        this.btnCount--;

        // 倒计时结束，恢复按钮状态
        if (this.btnCount <= 0) {
          clearInterval(this.btnTimer);
          this.btnTimer = null;
          this.isBtnDisabled = false;
        }
      }, 1000);
    },
    // 启动跳转倒计时方法
    startJumpCountdown() {
      this.count = this.defaultCount;
      this.isCounting = true;

      if (this.timer) {
        clearInterval(this.timer);
      }

      this.timer = setInterval(() => {
        this.count--;

        if (this.count <= 0) {
          this.clearJumpTimer();
          localStorage.setItem('isLogin', 'true');
          this.$router.push('/dashboard');
        }
      }, 1000);
    },
    // 清除跳转定时器
    clearJumpTimer() {
      clearInterval(this.timer);
      this.timer = null;
      this.isCounting = false;
    }
  },
  // 组件销毁时清除所有定时器
  beforeUnmount() {
    this.clearJumpTimer();
    if (this.btnTimer) {
      clearInterval(this.btnTimer);
    }
  }
}
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

/* 禁用状态样式 */
.login-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.login-btn:hover:not(:disabled) {
  background: #359469;
}

.error-message {
  color: red;
  margin-top: 10px;
  font-size: 14px;
}

pre {
  margin-top: 15px;
  color: #42b983;
  font-size: 14px;
}
</style>