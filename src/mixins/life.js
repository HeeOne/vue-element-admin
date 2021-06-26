export default {
  beforeCreate: function() {
    console.log('beforeCreate')
  },
  created: function() {
    console.log('created')
  },
  beforeMount: function() {
    console.log('beforeMount')
  },
  mounted: function() {
    console.log('mounted')
  },
  beforeUpdate: function() {
    console.log('beforeUpdate')
  },
  updated: function() {
    console.log('updated')
  },
  activated() {
    console.log('activated')
  },
  deactivated() {
    console.log('deactivated')
  },
  beforeDestroy: function() {
    console.log('beforeDestroy')
  },
  destroyed: function() {
    console.log('destroyed')
  }
}
