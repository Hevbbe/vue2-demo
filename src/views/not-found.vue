<template>
  <div class="not-found">
    <h1>404</h1>
    <p>页面不存在！</p>
    <router-link :to="{ name: 'login' }">返回首页</router-link>
  </div>
</template>

<script>
export default {
  name: 'NotFound'
}
</script>