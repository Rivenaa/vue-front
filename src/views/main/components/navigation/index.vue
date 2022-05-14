<template>
  <Mobile-navigation v-if="isMobileTerminal" />
</template>

<script setup>
import { isMobileTerminal } from '@/utils/flexible'
import MobileNavigation from './mobile/index.vue'
import {} from 'vue'
</script>

<style lang="scss" scoped></style>
