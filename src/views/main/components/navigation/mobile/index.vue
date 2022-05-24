<template>
  <div class="bg-white sticky dark:bg-zinc-900 top-0 left-0 z-10">
    <ul
      ref="ulRef"
      class="relative flex overflow-x-auto p-1 text-xs text-zinc-600 overflow-hidden"
    >
      <!-- 滑块 -->
      <li
        ref="sliderTarget"
        class="absolute h-[22px] bg-zinc-900 dark:bg-zinc-800 rounded-lg duration-200"
        :style="sliderStyle"
      />
      <!-- items -->
      <li
        :ref="itemsRef"
        v-for="(item, index) in $store.getters.categorys"
        :key="item.id"
        class="shrink-0 px-1.5 py-0.5 z-10 duration-200 last:mr-4"
        :class="{ 'text-zinc-100': currentCategoryIndex === index }"
        @click="onItemClick(index)"
      >
        {{ item.name }}
      </li>
      <!-- 汉堡按钮 -->
      <li
        class="fixed top-0 right-[-1px] h-4 px-1 flex items-center bg-white z-20 dark:bg-zinc-900 shadow-l-white dark:shadow-l-zinc"
        @click="onShowPopup"
      >
        <Svg-icon name="hamburger" class="w-1.5 h-1.5" />
      </li>
    </ul>
    <Popup v-model="isVisable">
      <Menu-vue @onItemClick="onItemClick" />
    </Popup>
  </div>
</template>

<script setup>
import { ref, onBeforeUpdate, watch } from 'vue'
import { useScroll } from '@vueuse/core'
import MenuVue from '../../menu/index.vue'

// 滑块样式
const sliderStyle = ref({
  transform: 'translateX(0px)',
  width: '52px'
})

// 选中item的下标
const currentCategoryIndex = ref(0)

// 获取所有item元素
let itemsEL = []
const itemsRef = el => {
  if (el) {
    itemsEL.push(el)
  }
}

onBeforeUpdate(() => {
  itemsEL = []
})

const ulRef = ref(null)
const { x: ulScrollLeft } = useScroll(ulRef)

watch(currentCategoryIndex, newIndex => {
  const { left, width } = itemsEL[newIndex].getBoundingClientRect()
  sliderStyle.value = {
    transform: `translateX(${ulScrollLeft.value + left - 10}px)`,
    width: `${width}px`
  }
})

const onItemClick = index => {
  currentCategoryIndex.value = index
  isVisable.value = false
}

const isVisable = ref(false)
const onShowPopup = () => {
  isVisable.value = true
}
</script>

<style lang="scss" scoped></style>
