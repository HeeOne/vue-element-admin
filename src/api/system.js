import request from '@/utils/request'

export function fetchOfficeList() {
  return request({
    url: '/gmfmeswms/sys/office/treeData',
    method: 'get'
  })
}
