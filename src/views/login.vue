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
      <button type="submit" class="login-btn">登录</button>
      <p class="error-message" v-if="errorMsg">{{ errorMsg }}</p>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      username: '', // 用户名绑定
      password: '', // 密码绑定
      errorMsg: ''  // 错误提示
    }
  },
  methods: {
    handleLogin() {
      if (this.username === 'admin' && this.password === '123456') {
        localStorage.setItem('isLogin', 'true');
        this.$router.push('/dashboard');
      } else {
        this.errorMsg = '用户名或密码错误（正确：admin/123456）';
        setTimeout(() => {
          this.errorMsg = '';
        }, 3000);
      }
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