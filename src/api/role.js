const { mockRequestData } = require('../../mock/index-inuse')

export function getRoutes() {
  return mockRequestData({
    url: '/vue-element-admin/routes',
    method: 'get'
  })
}

export function getRoles() {
  return mockRequestData({
    url: '/vue-element-admin/roles',
    method: 'get'
  })
}

export function addRole(data) {
  return mockRequestData({
    url: '/vue-element-admin/role',
    method: 'post',
    data
  })
}

export function updateRole(id, data) {
  return mockRequestData({
    url: `/vue-element-admin/role/${id}`,
    method: 'put',
    data
  })
}

export function deleteRole(id) {
  return mockRequestData({
    url: `/vue-element-admin/role/${id}`,
    method: 'delete'
  })
}
