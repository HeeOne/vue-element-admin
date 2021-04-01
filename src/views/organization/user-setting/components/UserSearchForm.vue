<template>
  <el-form v-loading="loading" class="search-form" label-position="top" label-width="80px" :model="userForm">
    <!-- organization -->
    <el-form-item :label="$t('Zone')">
      <el-cascader
        v-model="userForm.zone"
        :options="zoneList"
        :props="{ checkStrictly: true }"
        clearable
        filterable
        collapse-tags
      />
    </el-form-item>
    <el-form-item
      v-for="(item, index) in formItems"
      :key="index"
      :label="$t(item.label)"
    >
      <el-input
        v-model="userForm[item.bindKey]"
        :placeholder="$t(item.placeholder)"
        clearable
      />
    </el-form-item>
  </el-form>
</template>

<script>
import { fetchOfficeList } from '@/api/system'

export default {
  name: 'UserSearchForm',
  data() {
    return {
      formItems: [
        { label: 'Login Name', placeholder: '', bindKey: 'loginName' },
        { label: 'User Name', placeholder: '', bindKey: 'userName' }
      ],
      userForm: { zone: [], loginName: '', userName: '' },
      zoneList: [],
      loading: false
    }
  },
  mounted() {
    this.loading = true
    fetchOfficeList().then(({ treeData }) => {
      this.zoneList = dealOfficeList(treeData)
      this.userForm.zone.push(this.zoneList[0].value)
    }).catch(err => {
      console.log(err)
    }).finally(() => {
      this.loading = false
    })
  }
}

function dealOfficeList(list) {
  const res = []
  list.forEach(element => {
    const item = { label: element.name, value: element.id }
    if (element.children && element.children.length) {
      item.children = dealOfficeList(element.children)
    }
    res.push(item)
  })
  return res
}
</script>
