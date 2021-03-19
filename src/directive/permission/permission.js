import store from '@/store'

function checkPermission(el, binding) {
  const { value } = binding
  const btnLimits = store.getters && store.getters.btnLimits

  let hasPermission = false
  if (value && typeof value === 'string') {
    hasPermission = btnLimits.includes(value)
  } else if (value && (value instanceof Array) && (value.length > 0)) {
    hasPermission = btnLimits.some(item => {
      return value.includes(item)
    })
  } else {
    throw new Error(`need btnLimits! Like v-permission="['admin','editor']" or v-permission="admin"`)
  }

  if (!hasPermission) {
    el.parentNode && el.parentNode.removeChild(el)
  }
  return hasPermission
}

export default {
  inserted(el, binding) {
    checkPermission(el, binding)
  },
  update(el, binding) {
    checkPermission(el, binding)
  }
}
