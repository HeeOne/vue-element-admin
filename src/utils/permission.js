import store from '@/store'

/**
 * @param {Array} value
 * @returns {Boolean}
 * @example see @/views/permission/directive.vue
 */
export default function checkPermission(value) {
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

  return hasPermission
}
