const { mockRequestData } = require('../../mock/index-inuse')

export function searchUser(name) {
  return mockRequestData({
    url: '/vue-element-admin/search/user',
    method: 'get',
    params: { name }
  })
}

export function transactionList(query) {
  return mockRequestData({
    url: '/vue-element-admin/transaction/list',
    method: 'get',
    params: query
  })
}
