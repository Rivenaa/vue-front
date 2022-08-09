<template>
  <div class="w-full h-full bg-zinc-200 dark:bg-zinc-800">
    <Pins :id="$route.params.id" />
  </div>
</template>

<script setup>
import Pins from './component/pins.vue'
</script>
