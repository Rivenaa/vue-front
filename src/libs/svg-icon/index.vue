<template>
  <svg aria-hidden="true">
    <use :xlink:href="symbolId" :class="fillClass" :fill="color" />
  </svg>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
  name: {
    type: String,
    required: true
  },
  fillClass: String,
  color: String
})

const symbolId = computed(() => `#icon-${props.name}`)
</script>

<style lang="scss" scoped></style>
