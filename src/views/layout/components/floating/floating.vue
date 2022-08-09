<template>
  <div class="fixed bottom-10 right-1.5">
    <!-- 引导页 -->
    <div
      class="guide-start w-4 h-4 mb-1 bg-white dark:bg-zinc-900 border dark:border-none border-zinc-200 rounded-[100%] flex justify-center items-center cursor-pointer duration-200 hover:shadow-lg group"
      @click="onGuideClick"
    >
      <Svg-icon
        name="guide"
        class="w-2 h-2"
        fillClass="fill-zinc-900 dark:fill-zinc-200  group-hover:fill-main"
      >
      </Svg-icon>
    </div>
    <!-- 反馈 -->
    <Popover class="guide-feedback flex items-center" placement="top-left">
      <template #reference>
        <div
          class="w-4 h-4 bg-white dark:bg-zinc-900 border dark:border-none border-zinc-200 rounded-[100%] flex justify-center items-center cursor-pointer duration-200 hover:shadow-lg group"
        >
          <Svg-icon
            name="feedback"
            class="w-2 h-2"
            fillClass="fill-zinc-900  dark:fill-zinc-200  group-hover:fill-main"
          />
        </div>
      </template>
      <div class="w-[140px] overflow-hidden">
        <div
          class="flex item-center p-1 cursor-pointer rounded hover:bg-zinc-100/60 dark:hover:bg-zinc-800"
        >
          <Svg-icon
            name="feedback"
            class="w-1.5 h-1.5 mr-1"
            fillClass="fill-zinc-900  dark:fill-zinc-300"
          />
          <span class="text-zinc-800 dark:text-zinc-300 text-sm">
            立即吐槽
          </span>
        </div>
      </div>
    </Popover>
  </div>
</template>

<script setup>
import { onMounted } from '@vue/runtime-core'
import Driver from 'driver.js'
import 'driver.js/dist/driver.min.css'
import steps from './steps.js'

// 初始化
let driver = null
onMounted(() => {
  driver = new Driver({
    allowClose: false,
    closeBtnText: '关闭',
    nextBtnText: '下一步',
    prevBtnText: '上一步'
  })
})

// 开始引导
function onGuideClick() {
  // 指定引导步骤
  driver.defineSteps(steps)
  // 开始
  driver.start()
}
</script>

<style lang="scss" scoped>
.driver-fix-stacking {
  position: fixed;
  z-index: 100004 !important;
}
</style>
