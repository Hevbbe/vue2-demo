import Mock from 'mockjs'

// 登录接口
Mock.mock('/api/login', 'post', req => {
  const body = JSON.parse(req.body || '{}')

  if (body.username === 'admin' && body.password === '123456') {
    return {
      code: 200,
      message: '登录成功',
      data: {
        token: 'mock-token-' + Date.now(),
        username: 'admin'
      }
    }
  }

  return {
    code: 400,
    message: '用户名或密码错误'
  }
})

// 获取用户信息
Mock.mock('/api/user/info', 'get', () => {
  return {
    code: 200,
    data: {
      name: 'Mock 用户',
      age: 22,
      roles: ['admin']
    }
  }
})

// token 检查
Mock.mock('/api/user/check', 'get', () => {
  const isExpire = Math.random() > 0.5
  return isExpire
    ? { code: 401, message: 'token 已过期，请重新登录' }
    : { code: 200, message: 'token 有效' }
})
