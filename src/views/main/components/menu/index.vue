<template>
  <div class="py-2 h-[80vh] flex flex-col">
    <h2 class="text-xl text-zinc-900 dark:text-zinc-200 font-bold mb-2 px-1">
      所有分类
    </h2>
    <ul class="overflow-y-scroll scroll">
      <li
        v-for="item in $store.getters.categories"
        :key="item.id"
        class="text-lg text-zinc-900 dark:text-zinc-300 px-1 py-1.5 duration-100 active:bg-zinc-100 dark:active:bg-zinc-900"
        @click="$emit('onItemClick', item)"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.scroll {
  scroll-behavior: smooth;
}
</style>
