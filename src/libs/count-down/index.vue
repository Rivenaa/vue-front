<template>
  <div>
    <slot>
      <p>{{ showTime }}</p>
    </slot>
  </div>
</template>

<script>
// 倒计时结束
const EMIT_FINISH = 'finish'
// 倒计时改变
const EMIT_CHANGE = 'change'
// 时间间隔
const INTERVAL_COUNT = 1000
</script>

<script setup>
import { ref, onUnmounted, computed, watch } from 'vue'
import dayjs from './utils'

const props = defineProps({
  // 时间 （单位：毫秒）
  time: {
    type: Number,
    required: true
  },
  // 格式 遵循day.js format
  format: {
    type: String,
    default: 'HH:mm:ss'
  }
})

const emits = defineEmits([EMIT_FINISH, EMIT_CHANGE])
const duration = ref(0)
let interval // 间隔

watch(
  () => props.time,
  val => {
    duration.value = val
    start()
  },
  { immediate: true }
)

/* 组件销毁时 清理倒计时 */
onUnmounted(() => {
  close()
})

/* 显示时间格式 */
const showTime = computed(() => {
  return dayjs.duration(duration.value).format(props.format)
})

/* 开始倒计时 */
function start() {
  close()
  interval = setInterval(() => {
    durationFn()
  }, INTERVAL_COUNT)
}

/* 倒计时的执行行为 */
function durationFn() {
  duration.value -= INTERVAL_COUNT
  emits(EMIT_CHANGE)
  if (duration.value <= 0) {
    duration.value = 0
    emits(EMIT_FINISH)
    close()
  }
}

/* 倒计时结束 */
function close() {
  if (interval) {
    clearInterval(interval)
  }
}
</script>
