<template>
  <div class="zm-progress-steps">
    <template v-for="(item, index) in steps">
      <div
        :key="index"
        class="steps-item"
        :class="getItemBarClass(index)"
        @click="clickStepFn(index)"
      >
        <div class="steps-item-text">
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
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProgressSteps',
  props: {
    steps: {
      type: Array,
      required: true
    },
    clickFn: {
      type: Function,
      default: null
    },
    activeIx: {
      type: Number,
      default: 0
    },
    finishStatus: {
      type: String,
      default: 'success'
    },
    showIcon: {
      type: Boolean,
      default: false
    },
    showIndex: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      activeIndex: this.activeIx
    }
  },
  methods: {
    isFinishStatus(index) {
      // index  <= activeIndex
      return this.activeIndex >= index
    },
    getItemBarClass(index) {
      if (!this.isFinishStatus(index)) { return '' }
      return this.steps[index].finishStatus || this.finishStatus
    },
    getPreTriangleClass(index) {
      // 凸三角形
      const actualIx = index - 1
      if ((index !== 0) && this.isFinishStatus(actualIx)) {
        return this.steps[actualIx].finishStatus || this.finishStatus
      }
      return ''
    },
    getCurrTriangleClass(index) {
      // 凹三角形
      if ((index === 0) ||
          (index === this.steps.length) ||
          !this.isFinishStatus(index)
      ) { return '' }
      return this.steps[index].finishStatus || this.finishStatus
    },
    clickStepFn(index) {
      if (index === this.activeIndex) { return }
      this.activeIndex = index
      if (this.clickFn) {
        this.clickFn(this.steps[index])
      }
    }
  }
}
</script>
