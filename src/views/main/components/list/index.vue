<template>
  <div class="w-full px-2">
    <Waterfall
      :data="pexlesList"
      :column="isMobileTerminal ? 2 : 5"
      :picturePreReading="false"
    >
      <template v-slot="{ item, width }">
        <Item-vue :item="item" :width="width" />
      </template>
    </Waterfall>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getPexlesList } from '@/api'
import { isMobileTerminal } from '@/utils/flexible'
import ItemVue from './item.vue'

let query = {
  page: 1,
  size: 20
}

const pexlesList = ref([])

getPexlesList(query).then(res => {
  pexlesList.value = res.list
  console.log('res', pexlesList.value)
})
</script>

<style lang="scss" scoped></style>
