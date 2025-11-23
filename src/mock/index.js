// 自动加载 mock 目录下所有 js（除 index.js）
const files = require.context('.', false, /\.js$/)

files.keys().forEach(key => {
  if (key !== './index.js') {
    files(key)
  }
})

console.log('%cMock Started', 'color:green')
