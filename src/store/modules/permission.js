import { getUserPeimisson } from '@/api/user'
import { asyncRoutes, constantRoutes, devRoutes } from '@/router'
import { isTrueNullStr } from '@/utils/validate'

/**
 * filter config route
 * @param {Array} menuList
 * @returns
 */
function filterRouteHref(menuList) {
  let res = []
  menuList.forEach(el => {
    if (!el) { return }
    if (!isTrueNullStr(el.href)) {
      res.push(el.href)
    }
    if (el.children && el.children.length) {
      const tmp = filterRouteHref(el.children)
      res = [...res, ...tmp]
    }
  })
  return res
}

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(configHref, route) {
  if (route.meta && route.meta.href) {
    return configHref.some(href => route.meta.href === href)
  } else {
    return false
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
export function filterAsyncRoutes(routes, configHref) {
  const res = []
  routes.forEach(el => {
    if (!el) { return }
    const tmp = { ...el }
    if (tmp.children && tmp.children.length) {
      tmp.children = filterAsyncRoutes(tmp.children, configHref)
    }
    if (hasPermission(configHref, tmp) || (tmp.children.length > 0)) {
      res.push(tmp)
    }
    return false
  })

  return res
}

const state = {
  routes: [],
  addRoutes: [],
  btnLimits: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  },
  SET_BTN_LIMITS: (state, list) => {
    state.btnLimits = list
  }
}

const actions = {
  generateRoutes({ commit }, menuList) {
    return new Promise(resolve => {
      const configHref = filterRouteHref(menuList)
      let accessedRoutes = filterAsyncRoutes(asyncRoutes, configHref)
      if (process.env.NODE_ENV === 'development') {
        accessedRoutes = [...accessedRoutes, ...devRoutes]
      }
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  },
  // user permissions
  getUserPeimisson({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
      getUserPeimisson().then((res) => {
        const { dictList, menuList, permissions } = res
        commit('SET_BTN_LIMITS', permissions)
        dispatch('dict/addDict', dictList, { root: true })
        dispatch('generateRoutes', menuList)
        resolve({ accessRoutes: state.addRoutes })
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
