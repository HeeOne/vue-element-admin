<template>
  <div style="margin: 20px;">
    <div class="pane">
      <progress-steps
        :steps="steps"
        :show-index="form.showIndex"
        :show-icon="form.showIcon"
        :finish-status="form.finishStatus"
        :click-fn="clickStep"
      />
    </div>

    <div class="pane setting-pane">
      <el-form ref="form" :model="form" label-width="400px">
        <el-form-item label="Show Index">
          <el-switch v-model="form.showIndex" />
        </el-form-item>
        <el-form-item label="Show Icon">
          <el-switch v-model="form.showIcon" />
        </el-form-item>
        <el-form-item label="Finish Status">
          <el-select v-model="form.finishStatus" clearable placeholder="">
            <el-option
              v-for="item in statusList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <template v-for="(stepItem, index) in steps">
          <el-form-item :key="index" :label="stepItem.title + ' [Finish Status]'">
            <el-select v-model="stepItem.finishStatus" clearable placeholder="">
              <el-option
                v-for="item in statusList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </template>

      </el-form>
    </div>
  </div>
</template>

<script>
import ProgressSteps from '@/components/ProgressSteps'

const test_steps = [
  { title: 'Begin', icon: 'el-icon-edit', finishStatus: '' },
  { title: 'Progress', icon: 'el-icon-upload', finishStatus: '' },
  { title: 'Dev', icon: 'el-icon-caret-right', finishStatus: '' },
  { title: 'Finish', icon: 'el-icon-caret-left', finishStatus: '' }
]

export default {
  name: 'ProgressStepsDemo',
  components: { ProgressSteps },
  data() {
    return {
      steps: test_steps,
      currentStep: test_steps[0],
      form: {
        showIndex: false,
        showIcon: false,
        finishStatus: 'finish'
      },
      statusList: [
        { label: 'wait', value: 'wait' },
        { label: 'process', value: 'process' },
        { label: 'finish', value: 'finish' },
        { label: 'error', value: 'error' },
        { label: 'success', value: 'success' }
      ]
    }
  },
  methods: {
    clickStep(step) {
      this.currentStep = step
    }
  }
}
</script>

<style scoped>
.pane {
  margin-top: 50px;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
}

.setting-pane {
  box-shadow: 0 0 5px #ccc;
}
</style>
