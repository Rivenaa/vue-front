<template>
  <div>
    <!-- 蒙版 -->
    <transition name="fade">
      <div
        v-if="isVisible"
        @click="close"
        class="w-screen h-screen bg-zinc-900/80 z-40 fixed top-0 left-0"
      ></div>
    </transition>
    <!-- 内容区 -->
    <transition name="up">
      <div
        v-if="isVisible"
        class="max-w-[80%] max-h-[80%] overflow-auto fixed top-[10%] left-[50%] translate-x-[-50%] z-50 px-2 py-1.5 rounded-sm border dark:border-zinc-600 cursor-pointer bg-white dark:bg-zinc-800 lg:mix-w-[35%]"
      >
        <!-- 标题 -->
        <div
          v-if="title"
          class="text-lg font-bold text-zinc-900 dark:text-zinc-200 mb-2"
        >
          {{ title }}
        </div>
        <!-- 内容 -->
        <div class="text-base text-zinc-900 dark:text-zinc-200 mb-2">
          <slot />
        </div>
        <!-- 按钮 -->
        <div class="flex justify-end" v-if="cancelHandler || confirmHandler">
          <Button type="info" class="mr-2" @click="onCancelClick">
            {{ cancelText }}
          </Button>
          <Button type="primary" class="mr-2" @click="onConfirmClick">
            {{ confirmText }}
          </Button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { useVModel } from '@vueuse/core'
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  title: String,
  cancelText: String,
  confirmText: String,
  cancelHandler: Function,
  confirmHandler: Function,
  close: Function
})

defineEmits(['update:modelValue'])

const isVisible = useVModel(props)

// 取消按钮
function onCancelClick() {
  if (props.cancelHandler) {
    props.cancelHandler()
  }
  close()
}

// 确定按钮
function onConfirmClick() {
  if (props.confirmHandler) {
    props.confirmHandler()
  }
  close()
}

// 关闭
function close() {
  isVisible.value = false
  if (props.close) {
    props.close()
  }
}
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

.up-enter-active,
.up-leave-active {
  transition: all 0.3s;
}

.up-enter-from,
.up-leave-to {
  opacity: 0;
  transform: translate3d(-50%, 100px, 0);
}
</style>
