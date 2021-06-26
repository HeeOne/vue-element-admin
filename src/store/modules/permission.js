import { getUserPeimisson } from '@/api/user'
import { constantRoutes, asyncRoutes } from '@/router'

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
      commit('SET_ROUTES', menuList)
      resolve(menuList)
    })
  },
  // user permissions
  getUserPeimisson({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
      getUserPeimisson().then((res) => {
        const { dictList, permissions } = res
        commit('SET_BTN_LIMITS', permissions)
        dispatch('dict/addDict', dictList, { root: true })
        dispatch('generateRoutes', asyncRoutes)
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
