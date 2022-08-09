<template>
  <div>
    <transition name="fade">
      <!-- 蒙版 -->
      <div
        v-if="isVisible"
        class="w-screen h-screen bg-zinc-900/80 z-40 fixed top-0 left-0"
        @click="close"
      ></div>
    </transition>
    <transition name="up">
      <!-- 内容 -->
      <div
        v-if="isVisible"
        class="w-[80%] fixed top-1/3 left-[50%] translate-x-[-50%] z-50 px-2 py-1.5 rounded-sm border dark:border-zinc-600 cursor-pointer bg-white dark:bg-zinc-800 lg:w-[35%]"
      >
        <!-- 标题 -->
        <div class="text-lg font-bold text-zinc-900 dark:text-zinc-200 mb-2">
          {{ title }}
        </div>
        <!-- 文本 -->
        <div class="text-base text-zinc-900 dark:text-zinc-200 mb-2">
          {{ content }}
        </div>
        <!-- 按钮 -->
        <div class="flex justify-end">
          <Button type="info" class="mr-2" @click="onCancelClick">
            {{ cancelText }}
          </Button>
          <Button type="primary" @click="onConfirmClick">
            {{ confirmText }}
          </Button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
/* 因为confirm 组件会已方法调用的形式展示，需要主动导入组件 */
import { ref, onMounted } from '@vue/runtime-core'
import Button from '../button/index.vue'

const props = defineProps({
  title: String,
  content: {
    type: String,
    required: true
  },
  confirmText: {
    type: String,
    default: '确定'
  },
  cancelText: {
    type: String,
    default: '取消'
  },
  confirmHandler: Function,
  cancelHandler: Function,
  close: Function
})

const isVisible = ref(false)
const duration = '0.5s'

onMounted(() => {
  show()
})

function show() {
  isVisible.value = true
}

function close() {
  isVisible.value = false
  setTimeout(() => {
    if (props.close) {
      props.close()
    }
  }, parseInt(duration.replace('0.', '').replace('s', '') * 100))
}

function onCancelClick() {
  if (props.cancleHandler) {
    props.cancelHandler()
  }
  close()
}

function onConfirmClick() {
  if (props.confirmHandler) {
    props.confirmHandler()
  }
  close()
}
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all v-bind(duration);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.up-enter-active,
.up-leave-active {
  transition: all v-bind(duration);
}

.up-enter-from,
.up-leave-to {
  opacity: 0;
  transform: translate3d(-50%, 100px, 0);
}
</style>
