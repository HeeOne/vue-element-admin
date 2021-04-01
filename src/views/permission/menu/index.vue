<template>
  <div v-loading="loading" class="main-pane-page">

    <div class="search-btn-group">
      <el-button type="primary" size="small" @click="createCategory">Add Category</el-button>
      <el-button type="primary" size="small">Refresh</el-button>
    </div>

    <div class="search-data-table">
      <el-collapse class="table-des" accordion>
        <el-collapse-item>
          <template slot="title">
            Description<i class="header-icon el-icon-info" />
          </template>
          <div>isShow:
            [<div class="table-cell-show-status" /> not showed],
            [<div class="table-cell-show-status table-cell-show" /> showed]
          </div>
        </el-collapse-item>
      </el-collapse>

      <el-table
        :data="tableData"
        row-key="id"
        border
        height="550"
        size="small"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        :row-class-name="calcRowClass"
      >
        <el-table-column
          prop="name"
          :label="$t('name')"
          sortable
        />
        <el-table-column
          prop="platform"
          :label="$t('platform')"
        />
        <el-table-column
          prop="type"
          :label="$t('type')"
        >
          <template slot-scope="scope">
            <span>{{ getRowTypeName(scope.row) }}</span>
          </template>
        </el-table-column>

        <el-table-column
          prop="href"
          :label="$t('href')"
        />

        <el-table-column
          prop="isShow"
          :label="$t('isShow')"
        >
          <template slot-scope="scope">
            <div
              class="table-cell-show-status"
              :class="{ 'table-cell-show': scope.row.isShow == '1' }"
            />
          </template>
        </el-table-column>

        <el-table-column
          fixed="right"
          label="action"
        >
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleClick(scope.row)">view</el-button>
            <el-button type="text" size="small">edit</el-button>
          </template>
        </el-table-column>

      </el-table>
    </div>

    <menu-drawer ref="menuDrawer" />
  </div>
</template>

<script>
import i18n from '@/lang/index'

import { fetchMenu } from '@/api/menu'
import MenuDrawer from './components/aciton-drawer'

// type of menu config
const match = {
  0: { rowClass: 'category', tagType: 'primary', i18nKey: 'category' },
  1: { rowClass: 'menu', tagType: 'success', i18nKey: 'menu' },
  2: { rowClass: 'button', tagType: 'warning', i18nKey: 'button' }
}

// internationalization of the type name, for the performance
for (const key in match) {
  match[key]['name'] = i18n.t(match[key]['i18nKey'])
}

export default {
  name: 'MenuSetting',
  components: { MenuDrawer },
  data() {
    return {
      loading: false,
      tableData: []
    }
  },
  mounted() {
    this.fetchMenu()
  },
  methods: {
    fetchMenu() {
      this.loading = true
      fetchMenu({ platform: 'portal' }).then(({ treeData }) => {
        this.tableData = treeData
      }).catch(err => {
        console.log(err)
      }).finally(() => {
        this.loading = false
      })
    },
    getRowTypeName(row) {
      return match[row.type]['name'] || ''
    },
    getRowType(row) {
      return match[row.type]['tagType'] || ''
    },
    calcRowClass({ row }) {
      return match[row.type]['rowClass'] || ''
    },
    createCategory() {
      this.$refs.menuDrawer.showDrawer = true
    },
    handleClick(row) {
      this.$refs.menuDrawer.init(row)
      this.$refs.menuDrawer.showDrawer = true
    }
  }
}
</script>

<style lang="scss">
$category-clor: #ecf5ff;
$menu-color: #f0f9eb;
$button-color: #fdf6ec;

.el-table__row.category {
  background-color: $category-clor;
}
.el-table__row.menu {
  background-color: $menu-color;
}
.el-table__row.button {
  background-color: $button-color;
}

.table-cell-show-status {
  display: inline-block;
  height: 8px;
  width: 8px;
  border-radius: 50%;
  background-color: #c0c0c0;
}
.table-cell-show-status.table-cell-show {
  background-color: #67c23a;
}
.el-collapse.table-des {

  .el-collapse-item__content,
  .el-collapse-item__header {
    color: #aaa;
  }
}
</style>
