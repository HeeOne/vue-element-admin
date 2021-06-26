<template>
  <div class="zm-progress-steps" :class="{ 'gradient': gradient }">
    <template v-for="(item, index) in steps">
      <div
        :key="index"
        class="steps-item"
        :class="getItemBarClass(index)"
        @click="clickStepFn(index)"
      >
        <div class="steps-item-text" :style="itemTextStyle()">
          <span v-if="showIndex">{{ index + 1 }}<span>. </span></span>
          <i v-if="showIcon && item.icon" :class="item.icon" />
          {{ item.title }}
        </div>
        <div
          v-if="index != 0"
          class="triangle triangle-pre"
          :class="getPreTriangleClass(index)"
        />
        <div
          v-if="index != 0"
          class="triangle triangle-curr"
          :class="getCurrTriangleClass(index)"
        />
      </div>
    </template>
    <div class="the-last-item-triangle">
      <div
        class="triangle triangle-pre"
        :class="getPreTriangleClass(steps.length)"
      />
      <div
        class="triangle triangle-curr"
        :class="getCurrTriangleClass(steps.length)"
        :style="endTriangleStyle()"
      />
    </div>
  </div>
</template>

<script>
const gradientTotal = 6

export default {
  name: 'ProgressSteps',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    steps: {
      type: Array,
      required: true
    },
    // clickFn: {
    //   type: Function,
    //   default: null
    // },
    value: {
      type: Number,
      default: 0
    },
    finishStatus: {
      type: String,
      default: 'finish'
    },
    showIcon: {
      type: Boolean,
      default: false
    },
    showIndex: {
      type: Boolean,
      default: false
    },
    bgColor: {
      type: String,
      default: ''
    },
    gradient: {
      type: Boolean,
      default: false
    },
    textAlign: {
      type: String,
      default: 'center',
      validator: (val) => ['center', 'left', 'right'].indexOf(val) !== -1
    }
  },
  data() {
    return {
      activeIndex: this.value || 0
    }
  },
  watch: {
    value: {
      handler(val, oldVal) {
        this.activeIndex = val
      }
    }
  },
  methods: {
    itemTextStyle() {
      if (!this.textAlign) { return '' }
      return `text-align: ${this.textAlign};`
    },
    endTriangleStyle() {
      if (!this.bgColor) { return '' }
      return `border-color: ${this.bgColor};`
    },
    isFinishStatus(index) {
      // index  <= activeIndex
      return this.activeIndex >= index
    },
    getItemBarClass(index) {
      // 渐变模式
      if (this.gradient) {
        if (index === this.activeIndex) {
          return 'gradient-current'
        }
        const classi = (index + 1) % gradientTotal
        return 'gradient-' + (classi || gradientTotal)
      } else {
        // 非渐变模式
        if (!this.isFinishStatus(index)) { return '' }
        return this.steps[index].finishStatus || this.finishStatus
      }
    },
    getPreTriangleClass(index) { // 凸三角形
      const actualIx = index - 1
      // 渐变模式
      if (this.gradient) {
        if (actualIx === this.activeIndex) {
          return 'gradient-current'
        }
        const classi = (actualIx + 1) % gradientTotal
        return 'gradient-' + (classi || gradientTotal)
      } else {
        // 非渐变模式
        if ((index !== 0) && this.isFinishStatus(actualIx)) {
          return this.steps[actualIx].finishStatus || this.finishStatus
        }
        return ''
      }
    },
    getCurrTriangleClass(index) { // 凹三角形
      if ((index === 0) || (index === this.steps.length)) { return '' }
      // 渐变模式
      if (this.gradient) {
        if (index === this.activeIndex) {
          return 'gradient-current'
        }
        const classi = (index + 1) % gradientTotal
        return 'gradient-' + (classi || gradientTotal)
      } else {
        // 非渐变模式
        if (!this.isFinishStatus(index)) { return '' }
        return this.steps[index].finishStatus || this.finishStatus
      }
    },
    clickStepFn(index) {
      if (index === this.activeIndex) { return }
      // v-model有绑定值则emit触发更新， 没有则手动赋值
      if (this.value || this.value === 0) {
        this.$emit('change', index)
      } else {
        this.activeIndex = index
      }
      this.$emit('clickFn', this.steps[index])
    }
  }
}
</script>
