<template>
  <teleport to="body">
    <div>
      <!-- 蒙版 -->
      <transition name="fade">
        <div
          v-if="isVisible"
          class="w-screen h-screen bg-zinc-900/80 z-40 fixed top-0 left-0"
          @click="isVisible = false"
        />
      </transition>
      <!-- 内容 -->
      <!-- v-bind="$attrs" 主要是使用在组件存在多个根元素时，给组件指定的属性会写入到 v-bind="$attrs" 的元素上 -->
      <transition name="popup-down-up">
        <div
          v-if="isVisible"
          v-bind="$attrs"
          class="w-screen bg-white dark:bg-zinc-800 z-50 fixed bottom-0"
        >
          <slot />
        </div>
      </transition>
    </div>
  </teleport>
</template>

<script setup>
import { watch } from 'vue'
import { useScrollLock, useVModel } from '@vueuse/core'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})

defineEmits(['update:modelValue'])

const isLocked = useScrollLock(document.body)
const isVisible = useVModel(props)

watch(
  isVisible,
  newVal => {
    isLocked.value = newVal
  },
  {
    immediate: true
  }
)
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.popup-down-up-enter-active,
.popup-down-up-leave-active {
  transition: all 0.3s;
}
.popup-down-up-enter-from,
.popup-down-up-leave-to {
  transform: translateY(100%);
}
</style>
