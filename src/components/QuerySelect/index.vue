
<template>
  <div v-clickoutside="close" style="position:relative;">
    <el-button
      class="query-select-button"
      :disabled="disabled"
      @click="open($event)"
    >
      <span v-show="buttonText">{{ buttonText }}</span>
      <span v-show="!buttonText" class="placeholder">{{ placeholder }}</span>
      <i
        v-show="buttonText"
        class="el-icon-circle-close"
        @click.prevent.stop="unSelectAll"
      />
    </el-button>
    <div
      v-show="visible"
      class="query-select-popover"
      :style="{ top: top + 'px' }"
    >
      <div v-show="multiple && selectedList.length" class="count-wrap">
        <el-tag
          closable
          type="danger"
          @close="unSelectAll"
        >
          {{ selectedList.length }}
        </el-tag>
      </div>
      <el-scrollbar v-show="selectedList.length && selectedList[0][valueKey]" class="selected-pane">
        <div class="options-list">
          <el-tag
            v-for="(tag, index) in selectedList"
            :key="tag[valueKey]"
            closable
            type="success"
            @close="unSelectItem(index)"
          >
            {{ tag[labelKey] }}
          </el-tag>
        </div>
      </el-scrollbar>
      <el-input
        v-model="input"
        prefix-icon="el-icon-search"
        clearable
        @focus.once="remoteMethod"
      />
      <el-scrollbar v-show="!loading" class="to-select-pane">
        <div class="options-list">
          <template v-for="(item, index) in options">
            <el-button
              :key="item[valueKey]"
              class="to-select-item"
              @click="selectItem(index)"
            >{{ item[labelKey] }}
            </el-button>
          </template>
        </div>
      </el-scrollbar>
      <div
        v-show="!loading && !options.length"
        v-loading="loading"
        class="no-result-tip"
      >
        No matching result.
      </div>
      <div v-show="loading" v-loading="loading" class="loading-height" />
    </div>
  </div>

</template>

<script>
import { isEqual, trim, cloneDeep, debounce } from 'lodash/index'

import request from '@/utils/httpRequest'
import clickoutside from 'element-ui/src/utils/clickoutside'

import { isString, isArray, isObject } from '@/utils/type-validate'

// { label, value }
function isLegalObject(label, value, obj) {
  if (!isObject(obj)) { return false }
  return (label in obj) && (value in obj) && (obj[value] !== '')
}

export default {
  name: 'QuerySelect',
  directives: {
    clickoutside
  },
  model: {
    prop: 'value',
    event: 'update'
  },
  props: {
    queryUrl: {
      type: String,
      required: true
    },
    queryKey: {
      type: String,
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
    method: {
      type: String,
      default: 'post'
    },
    multiple: {
      type: Boolean,
      default: false
    },
    value: {
      type: [String, Array, Object],
      default: () => ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    params: {
      type: Object,
      default: () => null
    },
    cascade: {
      type: Object,
      default: () => null
    }
  },
  data() {
    return {
      top: 50,
      visible: false,
      loading: false,
      input: '',
      options: [],
      // buttonText: '',
      selectedList: []
    }
  },
  computed: {
    buttonText() {
      if (!this.selectedList.length) {
        return ''
      }
      const gen = this.selectedList.map(el => el[this.labelKey])
      return gen.join(',')
    }
  },
  watch: {
    // to update this.selectedList when the [value] changed
    value: {
      deep: true,
      immediate: true,
      handler(val) {
        // generate selectedList when type is String
        if (isString(val)) {
          const tmp = !trim(val) ? null : this.multiple ? val.split(',') : [val]
          if (tmp) {
            // when the flag that v-model binded is different from the [selectedList]
            const flag = tmp.some(el => !this.selectedList.some(el2 => el2[this.valueKey] === el))
            if (flag) {
              tmp.forEach(el => res.push({ [this.labelKey]: el, [this.valueKey]: el }))
              this.selectedList = res
            }
          } else {
            this.selectedList = []
          }
        }
        // emitUpdate v-model and then update selectedList
        // generate selectedList when type is Object and single mode
        const res = []
        if (isObject(val) && !this.multiple) {
          // res.push(val)
          if (isLegalObject(this.labelKey, this.valueKey, val)) {
            res.push(val)
          }
          this.selectedList = res
        }
        if (isArray(val) && this.multiple) {
          val.forEach(el => {
            if (isLegalObject(this.labelKey, this.valueKey, el)) {
              res.push(el)
            }
            // res.push(el)
          })
          this.selectedList = res
        }
      }
    },
    // when cascade changed, clear all the selected items
    cascade: {
      // deep: true,
      handler(val, oldVal) {
        // console.log(val, oldVal)
        if (this.disabled || !this.selectedList.length || !oldVal) { return }
        // if exist change. {key:value} => [[key, value]]
        const changeFlag = Object.entries(val).some(el => {
          return !isEqual(oldVal[el[0]], el[1])
        })
        if (!changeFlag) { return }
        // clear all the selected items
        this.emitUpdate([])
        this.remoteMethod()
      }
    },
    input: 'remoteMethod'
  },
  methods: {
    emitUpdate(val) {
      let emitVal
      // emit[update] when the type of [value] is Array or Object
      if (isArray(this.value) || isObject(this.value)) {
        isArray(this.value) && (emitVal = val)
        if (isObject(this.value)) {
          emitVal = val.length ? val[0] : { [this.labelKey]: '', [this.valueKey]: '' }
        }
        this.$emit('update', emitVal)
      } else {
        this.selectedList = val
        const m = val.map(el => el[this.valueKey])
        const emitVal = m.join(',')
        this.$emit('update', emitVal)
      }
      // single selcet, close
      if (!this.multiple) {
        this.$nextTick(() => (this.visible = false))
      }
    },
    open() {
      const height = this.$el.getBoundingClientRect().height;
      (height !== this.top) && (this.top = height)
      if (!this.visible) {
        this.visible = true
        if (!this.options.length) {
          this.input === ''
            ? this.remoteMethod()
            : this.input = ''
        }
      }
    },
    close() {
      this.visible && (this.visible = false)
    },
    isSelected(item) {
      return this.selectedList.some(el => el[this.valueKey] === item[this.valueKey])
    },
    selectItem(index) {
      const item = this.options[index]
      if (this.isSelected(item)) { return }
      let copy = cloneDeep(this.selectedList)
      this.multiple
        ? copy.push(item)
        : copy = [item]
      this.emitUpdate(copy)
    },
    unSelectItem(index) {
      const item = this.selectedList[index]
      if (!this.isSelected(item)) { return }
      const copy = cloneDeep(this.selectedList)
      copy.splice(index, 1)
      this.emitUpdate(copy)
    },
    unSelectAll() {
      this.emitUpdate([])
    },
    remoteMethod: debounce(function() {
      // 兼容 focus 事件
      const query = this.input
      this.loading = true
      // query data
      const params = {
        pageNo: 1,
        pageSize: 10
      }
      if (query) {
        params[this.queryKey] = query
      }
      if (this.params) {
        for (const key in this.params) {
          params[key] = this.params[key]
        }
      }
      if (this.cascade) {
        for (const key in this.cascade) {
          params[key] = this.cascade[key]
        }
      }
      const httpObj = {
        url: this.queryUrl,
        method: this.method
      }
      const paramsKey = this.method.toUpperCase() === 'GET' ? 'query' : 'data'
      httpObj[paramsKey] = params
      const res = []
      request(httpObj)
        .then(({ data }) => {
          const { page } = data
          if (page.list && page.list.length) {
            const labelKey = this.labelKey
            const valueKey = this.valueKey
            page.list.forEach((element) => {
              res.push({
                [labelKey]: element[labelKey],
                [valueKey]: element[valueKey]
              })
            })
          }
        })
        .catch((err) => console.log(err))
        .finally(() => {
          this.loading = false
          this.options = res
        })
    }, 1000)
  }
}
</script>
