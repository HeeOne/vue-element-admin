import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/gmfmeswms/sys/login',
    method: 'post',
    data
  })
}

export function getUserPeimisson() {
  return request({
    url: '/gmfmeswms/sys/user/getMenus',
    method: 'get'
  })
}

export function fetchUserList(query) {
  return request({
    url: '/gmfmeswms/sys/user/list',
    method: 'get',
    query
  })
}

export function logout() {
  return request({
    url: '/gmfmeswms/sys/logout',
    method: 'get'
  })
}
