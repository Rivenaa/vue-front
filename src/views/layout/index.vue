<template>
  <div class="h-screen">
    <Header-vue class="h-header" />
    <div class="h-main">
      <Main-vue />
    </div>
    <Floating-vue />
  </div>
</template>

<script setup>
import HeaderVue from './components/header/index.vue'
import MainVue from './components/main.vue'
import FloatingVue from './components/floating/floating.vue'
</script>
