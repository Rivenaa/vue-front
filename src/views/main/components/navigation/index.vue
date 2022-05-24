<template>
  <Mobile-navigation v-if="isMobileTerminal" />
  <Pc-Navigation v-else />
</template>

<script setup>
import { useStore } from 'vuex'
import { isMobileTerminal } from '@/utils/flexible'
import MobileNavigation from './mobile/index.vue'
import PcNavigation from './pc/index.vue'

const store = useStore()
store.dispatch('category/getCategorys')
</script>

<style lang="scss" scoped></style>
