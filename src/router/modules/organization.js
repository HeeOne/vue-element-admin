/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const organizationRouter = [
  {
    path: '/organization',
    component: Layout,
    redirect: 'noRedirect',
    name: 'organization',
    meta: {
      title: 'organization',
      icon: 'chart'
    },
    children: [
      {
        path: 'office-setting',
        component: () => import('@/views/organization/office-setting/index'),
        name: 'officeSetting',
        meta: { title: 'officeSetting', noCache: true, href: '/sys/office/OfficeList' }
      },
      {
        path: 'user-setting',
        component: () => import('@/views/organization/user-setting/index'),
        name: 'userSetting',
        meta: { title: 'userSetting', noCache: true, href: '/sys/user/UserList' }
      }
    ]
  }
]

export default organizationRouter
