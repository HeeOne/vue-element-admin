/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const permissionRouter = [
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/role',
    alwaysShow: true, // will always show the root menu
    name: 'Permission',
    meta: {
      title: 'permission',
      icon: 'lock'
    },
    children: [
      {
        path: 'menu',
        component: () => import('@/views/permission/menu/index'),
        name: 'pagePermission',
        meta: {
          title: 'pagePermission',
          href: '/sys/menu/MenuList',
          noCache: true
        }
      },
      {
        path: 'role',
        component: () => import('@/views/permission/role/index'),
        name: 'RolePermission',
        meta: {
          title: 'rolePermission',
          href: '/sys/role/RoleList',
          noCache: true
        }
      }
    ]
  }
]

export default permissionRouter
