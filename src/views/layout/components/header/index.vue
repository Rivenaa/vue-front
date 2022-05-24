<template>
  <div
    class="w-full bg-white dark:bg-zinc-800 border-b border-b-zinc-200 dark:border-b-zinc-700 px-2 py-1 duration-200"
  >
    <div class="flex items-center">
      <img
        title="logo"
        class="h-4 cursor-pointer mr-2 rounded-sm"
        src="@/assets/images/lijia3.webp"
        @click="onToHome"
      />
      <Header-search class="mr-1"></Header-search>
      <Header-theme class="mr-1"></Header-theme>
      <Header-my></Header-my>
    </div>
  </div>
</template>

<script setup>
import {} from 'vue'
import { useRouter } from 'vue-router'
import HeaderSearch from './header-search/index.vue'
import HeaderTheme from './header-theme.vue'
import HeaderMy from './header-my.vue'

const router = useRouter()

const onToHome = () => {
  router.push('/')
}
</script>

<style lang="scss" scoped></style>
