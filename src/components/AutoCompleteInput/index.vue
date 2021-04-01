<template>
  <el-autocomplete
    v-model="state"
    style="width: 100%;"
    clearable
    :fetch-suggestions="querySearch"
    :trigger-on-focus="false"
    :placeholder="placeholder"
    @select="handleSelect"
  />
</template>

<script>
import debounce from 'lodash/debounce'
import request from '@/utils/request'

export default {
  name: 'AutoCompleteInput',
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
    includeKey: {
      type: Array,
      default: () => []
    },
    methods: {
      type: String,
      default: 'post'
    },
    placeholder: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      state: '',
      loading: false
    }
  },
  methods: {
    querySearch: debounce(function(queryString, cb) {
      this.loading = true
      // query data
      const params = {
        pageNo: 1,
        pageSize: 10
      }
      if (this.filterByDataRule) {
        params['filterByDataRule'] = true
      }
      if (queryString) {
        params[this.queryKey] = queryString
      }
      //
      const httpObj = {
        url: this.queryUrl,
        method: this.methods
      }
      const paramsKey = this.methods.toUpperCase() === 'GET' ? 'query' : 'data'
      httpObj[paramsKey] = params
      const res = []
      request(httpObj)
        .then(({ data }) => {
          const { page } = data
          if (page.list && page.list.length) {
            page.list.forEach((element) => {
              const item = { value: element[this.labelKey] }
              this.includeKey.forEach(el => {
                if (el in element) {
                  item[el] = element[el]
                }
              })
              res.push(item)
            })
          }
        })
        .catch((err) => console.log(err))
        .finally(() => {
          this.loading = false
          cb(res)
        })
    }, 1000),
    handleSelect(item) {
      console.log(item)
    }
  }
}
</script>

