<template>
  <el-popover placement="bottom" :width="width">
    <div class="zm-query-select-popover">
      <div v-show="selectedTag.length > 1">
        <el-tag
          type="danger"
          effect="dark"
          closable
          @close="clearAllSelected"
        >
          {{ '+' + selectedTag.length }}
        </el-tag>
      </div>
      <el-scrollbar class="selected-pane">
        <div>
          <el-tag
            v-for="tag in selectedTag"
            :key="tag[valueKey]"
            closable
            type="success"
            class="show-all"
            @close="handleClose(tag)"
          >
            {{ tag[labelKey] }}
          </el-tag>
        </div>
      </el-scrollbar>
      <el-input
        v-model="input"
        clearable
      />
      <el-scrollbar class="to-select-pane">
        <div class="options-list">
          <template v-for="item in options">
            <el-button
              :key="item[valueKey]"
              class="to-select-item"
              @click="selectItem(item)"
            >{{ item[labelKey] }}
            </el-button>
          </template>
        </div>
      </el-scrollbar>
      <div
        v-show="!options.length"
        class="no-result-tip"
      >
        No matching result.
      </div>
    </div>
    <el-button
      slot="reference"
      class="zm-query-select-button"
      :disabled="disabled"
    >
      <span v-show="buttonText">{{ buttonText }}</span>
      <span v-show="!buttonText" class="placeholder">{{ placeholder }}</span>
    </el-button>
  </el-popover>
</template>

<script>
import debounce from 'lodash/debounce'

// [{ value: 23}, {value:45}] => [23, 45]
function getValuesInObjArr(arr, key) {
  const res = []
  arr.forEach(el => res.push(el[key]))
  return res
}

export default {
  name: 'QuerySelectLocal',
  model: {
    props: 'selected',
    event: 'change'
  },
  props: {
    datas: {
      type: Array,
      required: true
    },
    labelKey: {
      type: String,
      required: true
    },
    valueKey: {
      type: String,
      required: true
    },
    width: {
      type: String,
      default: '240'
    },
    multiple: {
      type: Boolean,
      default: false
    },
    selected: {
      type: Array,
      default: () => []
    },
    placeholder: {
      type: String,
      default: ''
    },
    cascadeKey: {
      type: String,
      default: ''
    },
    cascadeRange: {
      type: Array,
      default: () => []
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      selectedTag: [],
      input: '',
      options: this.datas,
      buttonText: '',
      seletctVal: []
    }
  },
  watch: {
    cascadeRange: {
      handler(val) {
        // 不存在级联： key === null
        if (!this.cascadeKey) { return }
        this.selectedTag = []
        this.filterOptions()
      }
    },
    input: {
      handler: debounce(function(val) {
        this.filterOptions()
      }),
      immediate: true
    },
    seletctVal(val) {
      this.$emit('change', val)
    },
    selectedTag: {
      handler(val) {
        const labelRes = []
        const valueRes = []
        const labelKey = this.labelKey
        const valueKey = this.valueKey
        val.forEach((el) => {
          labelRes.push(el[labelKey])
          valueRes.push(el[valueKey])
        })
        this.buttonText = labelRes.join(', ')
        this.seletctVal = valueRes
      }
    }
  },
  methods: {
    isInSelectedList(obj) {
      let itemTmp = null
      const valueKey = this.valueKey
      const valArr = getValuesInObjArr(this.selectedTag, valueKey)
      const i = valArr.indexOf(obj[valueKey])
      if (i > -1) {
        itemTmp = { i, item: obj }
      }
      return itemTmp
    },
    selectItem(item) {
      // 多选
      if (this.multiple) {
        const flag = this.isInSelectedList(item)
        if (flag) { return }
        this.selectedTag.push(item)
      } else {
        // 单选
        this.selectedTag = [item]
      }
    },
    clearAllSelected() {
      this.selectedTag = []
    },
    handleClose(tag) {
      const { i } = this.isInSelectedList(tag)
      this.selectedTag.splice(i, 1)
    },
    filterOptions() {
      const val = this.input
      const labelKey = this.labelKey
      let cascadeRes = this.datas.filter(el => {
        const cascadeKey = this.cascadeKey
        if (!cascadeKey) { return true }
        return this.cascadeRange.includes(el[cascadeKey])
      })
      if (val) {
        cascadeRes = cascadeRes.filter(el => el[labelKey].includes(val))
      }
      this.options = cascadeRes
    }
  }
}
</script>
