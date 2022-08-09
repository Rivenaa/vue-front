<template>
  <div>
    <!-- 内容 -->
    <slot />
    <div ref="loadingTarget" class="h-6 py-4">
      <!-- loading图标  加载更多 -->
      <Svg-icon
        v-show="loading"
        name="infinite-load"
        class="w-4 h-4 mx-auto animate-spin"
      />
      <!-- 加载完成，没有更多数据 -->
      <p v-if="isFinished" class="text-center text-base text-zinc-400">
        {{ text }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useVModel, useIntersectionObserver } from '@vueuse/core'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  isFinished: {
    type: Boolean,
    default: false
  },
  text: {
    type: String,
    default: '已经没有更多数据了'
  }
})

const emits = defineEmits(['onLoad', 'update:modelValue'])

// 滚动元素
const loadingTarget = ref(null)
const loading = useVModel(props)
let intersecting = null

useIntersectionObserver(loadingTarget, async ([{ isIntersecting }]) => {
  intersecting = isIntersecting
  onLoad()
})

function onLoad() {
  // isIntersecting 视图可见
  if (intersecting && !loading.value && !props.isFinished) {
    loading.value = true
    emits('onLoad')
  }
}

watch(loading, () => {
  setTimeout(() => {
    onLoad()
  }, 200)
})
</script>

<style lang="scss" scoped></style>
