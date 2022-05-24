<template>
  <button
    class="text-sm text-center rounded duration-150 flex justify-center items-center"
    :class="[
      typeEnum[type],
      sizeEnum[sizeKey].button,
      { 'active:scale-105': isActiveAnim }
    ]"
    @click.stop="onBtnClick"
  >
    <!-- loading -->
    <Svg-icon v-if="loading" name="loading" class="w-2 h-2 animate-spin mr-1" />
    <!-- icon 按钮 -->
    <Svg-icon
      v-if="icon"
      :name="icon"
      class="m-auto"
      :class="sizeEnum[sizeKey].icon"
      :color="iconColor"
      :fillClass="iconClass"
    />
    <!-- 文字按钮 -->
    <slot v-else />
  </button>
</template>

<script>
// type 可选项
const typeEnum = {
  primary:
    'text-white bg-zinc-800 dark:bg-zinc-900 hover:bg-zinc-900 dark:hover:bg-zinc-700 active:bg-zinc-800 dark:active:bg-zinc-700',
  main: 'text-white bg-main  dark:bg-zinc-900  hover:bg-hover-main dark:hover:bg-zinc-700  active:bg-main dark:active:bg-zinc-700',
  info: 'text-zinc-800 dark:text-zinc-300 bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-600 active:bg-zinc-200 dark:active:bg-zinc-700'
}

// size可选项
const sizeEnum = {
  // 文字按钮
  default: {
    button: 'w-8 h-4 text-base',
    icon: ''
  },
  // icon 按钮
  'icon-default': {
    button: 'w-4 h-4',
    icon: 'w-1.5 h-1.5'
  },
  small: {
    button: 'w-7 h-3 text-base',
    icon: ''
  },
  'icon-small': {
    button: 'w-3 h-3',
    icon: 'w-1.5 h-1.5'
  }
}

const EMIT_CLICK = 'click'
</script>

<script setup>
/**
 *  1.构建 type 风格可选项 和 size 大小可选项
 *  2.通过 props 让开发者控制按钮
 *  3.区分 文本button 和 图标button
 *  4.依据当前的数据，实现视图
 *  5.处理点击事件
 */
import { computed } from 'vue'

const props = defineProps({
  icon: String,
  iconColor: String,
  iconClass: String,
  type: {
    type: String,
    default: 'main',
    validator(val) {
      const keys = Object.keys(typeEnum)
      const result = keys.includes(val)
      if (!result) {
        throw new Error(`可选项type必须是${keys.join('、')}中的一个`)
      }
      return result
    }
  },
  size: {
    type: String,
    default: 'default',
    validator(val) {
      const keys = Object.keys(sizeEnum).filter(key => !key.includes('icon'))
      const result = keys.includes(val)
      if (!result) {
        throw new Error(`可选项size必须是${keys.join('、')}中的一个`)
      }
      return result
    }
  },
  isActiveAnim: {
    type: Boolean,
    default: true
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits([EMIT_CLICK])

const sizeKey = computed(() => (props.icon ? 'icon-' + props.size : props.size))

const onBtnClick = () => {
  if (props.loading) return
  emits(EMIT_CLICK)
}
</script>
