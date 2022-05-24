<template>
  <div class="w-full">
    <Search v-model="value">
      <template #dropdown>
        <div>dropdown</div>
      </template>
    </Search>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Search from '@/libs/search/index.vue'

const value = ref('')
</script>

<style lang="scss" scoped></style>
