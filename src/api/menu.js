import request from '@/utils/request'

export function fetchMenu(params) {
  return request({
    url: '/gmfmeswms/sys/menu/treeData2',
    method: 'get',
    params
  })
}

export function queryMenuItem(params) {
  return request({
    url: '/gmfmeswms/sys/menu/queryById',
    method: 'get',
    params
  })
}
