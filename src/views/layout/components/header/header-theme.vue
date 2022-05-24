<template>
  <Popover>
    <!-- 具名插槽 -->
    <template #reference>
      <Svg-icon
        :name="svgIconName"
        class="w-4 h-4 p-1 cursor-pointer rounded-sm duration-200 outline-none hover:bg-zinc-100/60 dark:hover:bg-zinc-900"
        fillClass="fill-zinc-900 dark:fill-zinc-300"
      />
    </template>
    <!-- 匿名插槽 -->
    <div class="w-[140px] overflow-hidden">
      <div
        v-for="item in THEME_ARR"
        :key="item.id"
        class="flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/60 dark:hover:bg-zinc-800"
        @click="onItemClick(item)"
      >
        <Svg-icon
          :name="item.icon"
          class="w-1.5 h-1.5 mr-1"
          fillClass="fill-zinc-900 dark:fill-zinc-300"
        />
        <span class="text-zinc-900 dark:text-zinc-300 text-sm">{{
          item.name
        }}</span>
      </div>
    </div>
  </Popover>
</template>

<script setup>
import { useStore } from 'vuex'
import { THEME_ARR } from '@/constants'
import { computed } from '@vue/runtime-core'

const store = useStore()

const svgIconName = computed(() => {
  const findTheme = THEME_ARR.find(item => {
    return item.icon === store.getters.themeType
  })
  return findTheme?.icon
})

const onItemClick = item => {
  store.commit('theme/setThemeType', item.icon)
}
</script>

<style lang="scss" scoped></style>
