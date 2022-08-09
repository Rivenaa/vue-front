<template>
  <div class="relative leading-[0px]">
    <!-- 单行 -->
    <input
      v-if="type === TYPE_TEXT"
      type="text"
      v-model="text"
      :maxlength="max"
      class="w-full border-gray-200 dark:border-zinc-600 dark:bg-zinc-800 duration-1 00 dark:text-zinc-400 border outline-none py-0.5 px-1 text-sm rounded-sm focus:border-blue-400"
    />
    <!-- 多行 -->
    <textarea
      v-if="type === TYPE_TEXTAREA"
      class="w-full border-gray-200 dark:border-zinc-600 dark:bg-zinc-800 duration-1 00 dark:text-zinc-400 border outline-none py-0.5 px-1 text-sm rounded-sm focus:border-blue-400"
      v-model="text"
      rows="5"
      :maxlength="max"
    ></textarea>
    <!-- 最大长度 -->
    <span
      v-if="max"
      class="absolute right-1 bottom-0.5 text-zinc-400 text-xs"
      :class="{ 'text-red-700 ': currentNumber === parseInt(max) }"
    >
      {{ currentNumber }} /{{ max }}
    </span>
  </div>
</template>

<script>
// 单行
const TYPE_TEXT = 'text'
const TYPE_TEXTAREA = 'textarea'
</script>

<script setup>
import { computed } from '@vue/runtime-core'
import { useVModel } from '@vueuse/core'

const props = defineProps({
  // v-model
  modelValue: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: TYPE_TEXT,
    validator(value) {
      const arr = [TYPE_TEXT, TYPE_TEXTAREA]
      const result = arr.includes(value)
      if (!result) {
        throw new Error(`type 的值必须在可选范围内 [${arr.join('、')}]`)
      }
      return result
    }
  },
  max: [Number, String]
})

defineEmits(['update:modelValue'])

const text = useVModel(props)

const currentNumber = computed(() => {
  return text.value.length
})
</script>

<style lang="scss" scoped></style>
