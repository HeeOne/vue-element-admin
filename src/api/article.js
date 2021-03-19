const { mockRequestData } = require('../../mock/index-inuse')

export function fetchList(query) {
  return mockRequestData({
    url: '/vue-element-admin/article/list',
    method: 'get',
    params: query
  })
}

export function fetchArticle(id) {
  return mockRequestData({
    url: '/vue-element-admin/article/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return mockRequestData({
    url: '/vue-element-admin/article/pv',
    method: 'get',
    params: { pv }
  })
}

export function createArticle(data) {
  return mockRequestData({
    url: '/vue-element-admin/article/create',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return mockRequestData({
    url: '/vue-element-admin/article/update',
    method: 'post',
    data
  })
}
