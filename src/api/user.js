import request from '@/utils/request'

export const login = data =>
  request({
    url: '/api/login',
    method: 'post',
    data
  })

export const getUserInfo = () =>
  request({
    url: '/api/user/info',
    method: 'get'
  })

export const checkToken = () =>
  request({
    url: '/api/user/check',
    method: 'get'
  })
