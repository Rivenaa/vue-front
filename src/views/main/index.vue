<template>
  <div class="h-full overflow-auto bg-white dark:bg-zinc-800 duration-300">
    <Navigation-vue />
    <div class="max-w-screen-xl mx-auto relative m-1">
      <List-vue />
    </div>
  </div>
</template>

<script setup>
import NavigationVue from './components/navigation/index.vue'
import ListVue from './components/list/index.vue'
import {} from 'vue'
</script>

<style lang="scss" scoped></style>
