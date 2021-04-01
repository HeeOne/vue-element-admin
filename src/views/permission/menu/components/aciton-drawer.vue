<template>
  <el-drawer
    title="我是标题"
    :visible.sync="showDrawer"
    direction="rtl"
    size="50%"
  >
    <div>
      <el-form ref="actionForm" label-position="top" :model="form">
        <el-form-item label="name">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="platform">
          <el-input v-model="form.platform" />
        </el-form-item>
        <el-form-item label="href">
          <el-input v-model="form.type" />
        </el-form-item>
      </el-form>
    </div>
  </el-drawer>
</template>

<script>
import { queryMenuItem } from '@/api/menu'

export default {
  name: 'MenuDrawer',
  props: {
    type: {
      type: String,
      default: 'view'
    },
    editRow: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      showDrawer: false,
      form: {
        name: '',
        platform: '',
        isShow: '',
        href: '',
        sort: ''
      }
    }
  },
  methods: {
    init({ id }) {
      queryMenuItem({ id: id }).then(({ menu }) => {
        this.setFromBy(menu)
      }).catch(err => {
        console.log(err)
      })
    },
    clearForm() {
      this.$refs.actionForm.resetFields()
    },
    setFromBy(item) {
      this.clearForm()
      const formTmp = this.form
      for (const key in formTmp) {
        formTmp[key] = key in item ? item[key] : ''
      }
    }
  }
}
</script>
