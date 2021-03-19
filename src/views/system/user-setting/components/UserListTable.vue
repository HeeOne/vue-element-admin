<template>
  <el-table
    :data="tableData"
    height="250"
    border
    style="width: 100%"
  >
    <el-table-column
      prop="loginName"
      label="loginName"
      width="180"
    />
    <el-table-column
      prop="userName"
      label="userName"
      width="180"
    />
  </el-table>
</template>

<script>
export default {
  name: 'UserListTable',
  props: {
    tableData: {
      type: Array,
      default: () => []
    }
  },
  methods: {

  }
}
</script>
