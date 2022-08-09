<template>
  <div>
    <div
      v-for="(item, index) in hintList"
      :key="index"
      class="py-1 pl-1 text-base font-bold text-zinc-500 rounded cursor-pointer duration-300 hover:bg-zinc-200 dark:hover:bg-zinc-900"
      v-html="highlightText(item)"
      @click.stop="itemClick(item)"
    />
  </div>
</template>

<script>
const EMITS_ITEM_CLICK = 'itemClick'
</script>

<script setup>
import { ref } from 'vue'
import { getHint } from '@/api'
import { watchDebounced } from '@vueuse/core'

const props = defineProps({
  searchText: {
    type: String,
    required: true
  }
})

const hintList = ref([])
const emits = defineEmits([EMITS_ITEM_CLICK])

watchDebounced(() => props.searchText, getHintData, {
  immediate: true,
  debounce: 300
})

async function getHintData() {
  if (!props.searchText) return
  const { result } = await getHint(props.searchText)
  hintList.value = result
}

function itemClick(item) {
  emits(EMITS_ITEM_CLICK, item)
}

// 高亮文本
function highlightText(text) {
  const highlightStr = `<span class="text-zinc-900 dark:text-zinc-200">${props.searchText}</span>`
  const reg = new RegExp(props.searchText, 'gi') // g:全局 i:不区分大小写
  return text.replace(reg, highlightStr)
}
</script>

<style lang="scss" scoped></style>
