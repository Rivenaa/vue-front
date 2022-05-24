<template>
  <div class="relative" @mouseenter="onMouseenter" @mouseleave="onMouseleave">
    <div ref="referenceTarget">
      <!-- 具名插槽 -->
      <slot name="reference" />
    </div>
    <transition name="slide">
      <div
        ref="contentTarget"
        v-if="isVisible"
        class="absolute p-1 z-20 bg-white dark:bg-zinc-900 border rounded-md dark:boder-zinc-700"
        :style="contentStyle"
      >
        <!-- 匿名插槽 -->
        <slot />
      </div>
    </transition>
  </div>
</template>
<script>
const PROP_TOP_LEFT = 'top-left'
const PROP_TOP_RIGHT = 'top-right'
const PROP_BOTTOM_LEFT = 'bottom-left'
const PROP_BOTTOM_RIGHT = 'bottom-right'

const placementEnum = [
  PROP_TOP_LEFT, // ↖
  PROP_TOP_RIGHT, // ↗
  PROP_BOTTOM_LEFT, // ↙
  PROP_BOTTOM_RIGHT // ↘
]

const DELAY_TIME = 100
</script>
<script setup>
import { nextTick, ref, watch } from 'vue'

const props = defineProps({
  placement: {
    type: String,
    default: PROP_BOTTOM_LEFT,
    validator(val) {
      const result = placementEnum.includes(val)
      if (!result) {
        throw new Error(
          `参数 placememnt 必须为 ${placementEnum.join('、')}中的一项`
        )
      }
      return result
    }
  }
})

const referenceTarget = ref(null)
const contentTarget = ref(null)
const isVisible = ref(false)
const contentStyle = ref({
  top: 0,
  left: 0
})

watch(isVisible, async newVisible => {
  if (!newVisible) return
  await nextTick()
  switch (props.placement) {
    // ↖
    case PROP_TOP_LEFT:
      contentStyle.value.top = 0
      contentStyle.value.left =
        -getElementSize(contentTarget.value).width + 'px '
      break
    // ↗
    case PROP_TOP_RIGHT:
      contentStyle.value.top = 0
      contentStyle.value.left =
        getElementSize(referenceTarget.value).width + 'px '
      break
    // ↙
    case PROP_BOTTOM_LEFT:
      contentStyle.value.top =
        getElementSize(referenceTarget.value).height + 'px '
      contentStyle.value.left =
        -getElementSize(contentTarget.value).width + 'px '
      break
    // ↘
    case PROP_BOTTOM_RIGHT:
      contentStyle.value.top =
        getElementSize(referenceTarget.value).height + 'px '
      contentStyle.value.left =
        getElementSize(referenceTarget.value).width + 'px '
      break
  }
})

let timeout
const onMouseenter = () => {
  if (timeout) {
    clearTimeout(timeout)
  }
  isVisible.value = true
}

const onMouseleave = () => {
  timeout = setTimeout(() => {
    isVisible.value = false
  }, DELAY_TIME)
}

const getElementSize = target => {
  if (!target) return {}
  return {
    width: target.offsetWidth,
    height: target.offsetHeight
  }
}
</script>

<style lang="scss" scoped>
.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.3, transfrom 0.3s;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
