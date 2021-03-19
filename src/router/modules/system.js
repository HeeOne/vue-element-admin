/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const systemRouter = [
  {
    path: '/sys',
    component: Layout,
    redirect: 'noRedirect',
    name: 'system',
    meta: {
      title: 'system',
      icon: 'chart'
    },
    children: [
      {
        path: 'office-setting',
        component: () => import('@/views/system/office-setting/index'),
        name: 'officeSetting',
        meta: { title: 'officeSetting', noCache: true, href: '/sys/office/OfficeList' }
      },
      {
        path: 'user-setting',
        component: () => import('@/views/system/user-setting/index'),
        name: 'userSetting',
        meta: { title: 'userSetting', noCache: true, href: '/sys/user/UserList' }
      }
    ]
  }
]

export default systemRouter
