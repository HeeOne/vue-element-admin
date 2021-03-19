import { isArray } from '@/utils/validate'

const state = {
  dict: {}
}

const mutations = {
  ADD_DICT: (state, obj) => {
    // repeat, will be covered
    for (const key in obj) {
      const valueArr = obj[key]
      if (!isArray(valueArr)) { continue }
      const genRes = []
      valueArr.forEach(element => {
        genRes.push({
          label: element.label,
          value: element.value
        })
      })
      state.dict[key] = genRes
    }
  }
}

const actions = {
  addDict({ commit }, dictObj) {
    commit('ADD_DICT', dictObj)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
