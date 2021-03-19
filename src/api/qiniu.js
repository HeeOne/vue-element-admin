const { mockRequestData } = require('../../mock/index-inuse')

export function getToken() {
  return mockRequestData({
    url: '/qiniu/upload/token', // 假地址 自行替换
    method: 'get'
  })
}
