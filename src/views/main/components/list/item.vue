<template>
  <div class="bg-white dark:bg-zinc-900 xl:dark:bg-zinc-800 rounded pb-1">
    <div class="relative w-full rounded cursor-zoom-in group">
      <!-- 图片 -->
      <img
        :src="item.photo"
        title=""
        class="w-full rounded bg-transparent"
        :style="{ height: (width / item.photoWidth) * item.photoHeight + 'px' }"
      />
      <!-- 遮罩层 -->
      <div
        class="hidden opacity-0 w-full h-full bg-zinc-900/50 absolute top-0 left-0 rounded duration-300 group-hover:opacity-100 lg:block"
      >
        <!-- 分享 -->
        <Button class="absolute top-1.5 left-1.5">分享</Button>
        <!-- 点赞 -->
        <Button
          class="absolute top-1.5 right-1.5"
          type="info"
          icon="heart"
          iconClass="fill-zinc-900 dark:fill-zinc-200"
        />
        <!-- 下载 -->
        <Button
          class="absolute bottom-1.5 left-1.5 bg-zinc-100/70"
          type="info"
          icon="download"
          size="small"
          iconClass="fill-zinc-900 dark:fill-zinc-200"
        />
        <!-- 全屏 -->
        <Button
          class="absolute bottom-1.5 right-1.5 bg-zinc-100/70"
          type="info"
          icon="full"
          size="small"
          iconClass="fill-zinc-900 dark:fill-zinc-200"
        />
      </div>
    </div>
    <!-- 标题 -->
    <p class="text-sm mt-1 font-bold text-zinc-900 dark:text-zinc-300 px-1">
      {{ item.title }}
    </p>
    <!-- 作者 -->
    <div class="flex items-center mt-1 px-1">
      <img :src="item.avatar" class="w-2 h-2 rounded-full" />
      <span class="text-sm text-zinc-500 ml-1">{{ item.author }}</span>
    </div>
  </div>
</template>

<script setup>
import {} from 'vue'
defineProps({
  item: {
    type: Object,
    required: true
  },
  width: Number
})
</script>

<style lang="scss" scoped></style>
