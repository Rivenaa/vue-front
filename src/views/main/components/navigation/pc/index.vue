<template>
  <div
    class="bg-white dark:bg-zinc-800 sticky top-0 left-0 w-full z-10 duration-200"
  >
    <ul
      class="w-[800px] relative flex flex-wrap justify-center overflow-x-auto px-[10px] py-1 text-xs text-zinc-500 dark:text-zinc-500 duration-300 overflow-hidden mx-auto"
      :class="{ 'h-[56px]': !isOpen }"
    >
      <!-- 展示箭头 -->
      <div
        class="absolute right-1 bottom-1 z-20 p-1 rounded cursor-pointer duration-200 hover:bg-zinc-200 dark:hover:bg-zinc-900"
        @click="triggerState"
      >
        <Svg-icon
          :name="isOpen ? 'fold' : 'unfold'"
          class="w-1 h-1"
          fillClass="fill-zinc-900 dark:fill-zinc-500"
        />
      </div>
      <!-- items -->
      <li
        v-for="(item, index) in $store.getters.categories"
        :key="item.id"
        class="shrink-0 px-1.5 py-0 z-10 duration-200 hover:text-zinc-900 dark:hover:text-zinc-300 text-base font-bold h-4 leading-4 cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-900 rounded mr-1 mb-1"
        :class="{
          ' text-zinc-900 bg-zinc-200 dark:bg-zinc-900 dark:text-zinc-300':
            $store.getters.currentCategoryIndex === index
        }"
        @click="onItemClick(item)"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { ref } from 'vue'

const store = useStore()
const isOpen = ref(false)

const triggerState = () => {
  isOpen.value = !isOpen.value
}

const onItemClick = item => {
  store.commit('app/setCurrentCategory', item)
}
</script>

<style lang="scss" scoped></style>
