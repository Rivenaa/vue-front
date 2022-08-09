<template>
  <div>
    <div class="text-xs mb-1 text-zinc-400">热门精选</div>
    <div class="flex h-[140px]" v-if="themeData.list.length">
      <!-- 大图 -->
      <div
        class="relative rounded w-[260px] cursor-pointer"
        :style="{ backgroundColor: randomRGB() }"
      >
        <img
          v-lazy
          :src="themeData.big.photo"
          class="w-full h-full object-cover rounded"
        />
        <p
          class="backdrop-blur absolute bottom-0 left-0 w-full h-[45%] flex items-center rounded px-1 text-white text-xs duration-300 hover:backdrop-blur-none"
        >
          #{{ themeData.big.title }}
        </p>
      </div>
      <!-- 小图 -->
      <div class="flex flex-wrap flex-1 max-w-[860px]">
        <div
          v-for="item in themeData.list"
          :key="item.id"
          class="w-[30%] h-[45%] text-white text-xs relative ml-1.5 mb-1.5 rounded cursor-pointer"
        >
          <img :src="item.photo" class="w-full h-full object-cover rounded" />
          <p
            class="backdrop-blur absolute top-0 left-0 w-full h-full flex items-center px-1 rounded duration-300 hover:backdrop-blur-none"
          >
            #{{ item.title }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getThemes } from '@/api'
import { randomRGB } from '@/utils/color'

const themeData = ref({
  big: {},
  list: []
})
1
getThemes().then(async res => {
  const { themes } = await res
  themeData.value = {
    big: themes[0],
    list: themes.splice(1, themes.length)
  }
  console.log(themeData.value)
})
</script>

<style lang="scss" scoped></style>
