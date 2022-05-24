<template>
  <div
    ref="containerTarget"
    class="group relative p-0.5 rounded-xl border-white dark:border-zinc-200 duration-500 hover:bg-red-100/40"
  >
    <div>
      <!-- 搜索图标 -->
      <Svg-icon
        name="search"
        class="w-1.5 h-1.5 absolute translate-y-[-50%] top-[50%] left-2"
        color="#707070"
      />
      <!-- 输入框 -->
      <input
        type="text"
        class="block w-full h-[44px] pl-4 outline-0 bg-zinc-100 dark:bg-zinc-800 caret-zinc-400 rounded-xl text-zinc-900 dark:text-zinc-200 tracking-wide text-sm font-semibold border border-zinc-100 dark:border-zinc-700 focus:border-red-300 duration-500 group-hover:bg-white dark:group-hover:bg-zinc-900 group-hover:border-zinc-200 dark:group-hover:border-zinc-700"
        placeholder="搜索"
        v-model="inputValue"
        @keyup.enter="onSearchHandler"
        @focus="onFocusHandler"
        @blur="onBlurHander"
      />
      <!-- 删除按钮 -->
      <Svg-icon
        v-show="inputValue"
        name="input-delete"
        class="w-1.5 h-1.5 absolute translate-y-[-50%] top-[50%] right-9 cursor-pointer duration-500"
        @click="onClearClick"
      />
      <!-- 分割线 -->
      <div
        class="opacity-0 h-1.5 w-[1px] absolute translate-y-[-50%] top-[50%] right-[62px] duration-500 bg-zinc-200 group-hover:opacity-100"
      ></div>
      <!-- 搜索按钮 -->
      <Button
        icon="search"
        iconColor="#fff"
        class="absolute translate-y-[-50%] top-[50%] right-1 rounded-[100%] opacity-0 group-hover:opacity-100 duration-500"
        @click="onSearchHandler"
      />
    </div>
    <!-- 下拉框 -->
    <transition name="slide">
      <div
        v-if="$slots.dropdown"
        v-show="isFocus"
        class="max-h-[368px] w-full text-base overflow-auto bg-white dark:bg-zinc-900 absolute z-20 left-0 top-[56px] p-2 rounded border border-zinc-200 dark:border-zinc-600 duration-200 hover:shadow-2xl dark:text-zinc-300"
      >
        <slot name="dropdown" />
      </div>
    </transition>
  </div>
</template>

<script>
const EMIT_UPDATE_MODELVALUE = 'update:modelValue'
const EMIT_SEARCH = 'search'
const EMIT_INPUT = 'input'
const EMIT_CLEAR = 'clear'
const EMIT_FOCUS = 'focus'
const EMIT_BLUR = 'blur'
</script>

<script setup>
/**
 *  1. 数据双向绑定
 *  2. 控制下拉展示区
 *  3. 事件处理
 *  4. 一键清空文本
 */
import { ref, watch } from 'vue'
import { useVModel, onClickOutside } from '@vueuse/core'
import { debounce } from 'throttle-debounce'

const props = defineProps({
  modelValue: {
    type: String,
    required: true
  }
})

const emits = defineEmits([
  EMIT_UPDATE_MODELVALUE, // 双向绑定
  EMIT_SEARCH, // search搜索
  EMIT_INPUT, // 文本输入
  EMIT_CLEAR, // 清空文本
  EMIT_FOCUS, // 获取焦点
  EMIT_BLUR // 失去焦点
])

const containerTarget = ref(null)
const isFocus = ref(false)
const inputValue = useVModel(props)

watch(inputValue, newValue => {
  debounceFunc(newValue)
})

const onClearClick = () => {
  inputValue.value = ''
  emits(EMIT_CLEAR, '')
}

const onSearchHandler = () => {
  console.log(1)
  emits(EMIT_SEARCH, inputValue.value)
}

const onFocusHandler = () => {
  isFocus.value = true
  emits(EMIT_FOCUS)
}

// 点击组件外部 关闭dropdown
onClickOutside(containerTarget, () => {
  isFocus.value = false
})

// 失去焦点
const onBlurHander = () => {
  emits(EMIT_BLUR)
}

const debounceFunc = debounce(200, value => {
  emits(EMIT_INPUT, value.trim())
})
</script>

<style lang="scss" scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(40px);
}
</style>
