<template>
  <div style="margin: 20px;">
    <div class="pane">
      <el-form ref="form" label-width="200px">
        <el-form-item prop="quality" label="仓库">
          <query-select-local
            v-model="warehouse"
            :datas="[{'id':'w1','warehouseName':'warehouseName 11111111111111111'},{'id':'w2','warehouseName':'warehouseName 22222222222222222'},{'id':'w3','warehouseName':'warehouseName 3333333333333333'},{'id':'w4','warehouseName':'warehouseName 44444444'},{'id':'w5','warehouseName':'warehouseName 5'},{'id':'w6','warehouseName':'warehouseName 6'},{'id':'w7','warehouseName':'warehouseName 7'},{'id':'w8','warehouseName':'warehouseName 8'},{'id':'w9','warehouseName':'warehouseName 9'}]"
            label-key="warehouseName"
            value-key="id"
            placeholder="缓存查询"
            :multiple="settingForm.mutiple"
          />
        </el-form-item>

        <el-form-item prop="quality" label="仓位">
          <query-select-local
            v-model="location"
            :datas="[{'id':'lo1','LocationName':'LocationName 11111111111111111', 'warehouseId': 'w8'},{'id':'lo2','LocationName':'LocationName 22222222222222222', 'warehouseId': 'w8'},{'id':'lo3','LocationName':'LocationName 3333333333333333', 'warehouseId': 'w3'},{'id':'lo4','LocationName':'LocationName 44444444', 'warehouseId': 'w4'},{'id':'lo5','LocationName':'LocationName 5', 'warehouseId': 'w4'},{'id':'lo6','LocationName':'LocationName 6', 'warehouseId': 'w7'},{'id':'lo7','LocationName':'LocationName 7', 'warehouseId': 'w4'},{'id':'lo8','LocationName':'LocationName 8', 'warehouseId': 'w2'},{'id':'lo9','LocationName':'LocationName 9', 'warehouseId': 'w2'},{'id':'lo10','LocationName':'LocationName 10', 'warehouseId': 'w2'},{'id':'lo11','LocationName':'LocationName 11', 'warehouseId': 'w1'},{'id':'lo12','LocationName':'LocationName 12', 'warehouseId': 'w1'},{'id':'lo13','LocationName':'LocationName 13', 'warehouseId': 'w1'},{'id':'lo14','LocationName':'LocationName 14', 'warehouseId': 'w1'},{'id':'lo15','LocationName':'LocationName 15', 'warehouseId': 'w1'},{'id':'lo16','LocationName':'LocationName 16', 'warehouseId': 'w1'}]"
            label-key="LocationName"
            value-key="id"
            cascade-key="warehouseId"
            :cascade-range="warehouse"
            placeholder="缓存查询"
            :multiple="settingForm.mutiple"
          />
        </el-form-item>
      </el-form>
    </div>

    <div class="pane setting-pane">
      <el-form ref="form" :model="settingForm" label-width="400px">
        <el-form-item label="Mutiple">
          <el-switch v-model="settingForm.mutiple" />
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import QuerySelectLocal from '@/components/QuerySelectLocal'

export default {
  name: 'QuerySelectLocalDemo',
  components: { QuerySelectLocal },
  data() {
    return {
      warehouse: [],
      location: [],
      settingForm: {
        mutiple: false
      }
    }
  }
}
</script>

<style scoped>
.pane {
  margin: 50px;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
}
</style>
