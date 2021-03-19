<template>
  <div class="user-setting-page">
    <user-search-form ref="form" />

    <div class="search-btn-group">
      <el-button type="primary" size="small" @click="search">{{ $t('Search') }}</el-button>
    </div>

    <user-list-table class="search-data-table" :table-data="data" />
  </div>
</template>

<script>
import UserSearchForm from './components/UserSearchForm'
import UserListTable from './components/UserListTable'

import { fetchUserList } from '@/api/user'

export default {
  name: 'OfficeSetting',
  components: { UserSearchForm, UserListTable },
  data() {
    return {
      data: []
    }
  },
  methods: {
    search() {
      // const queryForm = this.$refs.form.form
      const query = {
        'pageNo': 1,
        'pageSize': 10,
        'orderBy': 'loginName asc',
        'loginName': '',
        'name': '',
        'company.id': '',
        'office.id': ''
      }
      fetchUserList(query).then(({ page }) => {

      }).catch(() => {

      }).finally(() => {

      })
      console.log(this.$refs.form.userForm)
    }
  }
}
</script>
