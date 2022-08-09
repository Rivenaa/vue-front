<template>
  <div class="w-full px-2">
    <Infinite
      v-model="loading"
      :isFinished="isFinished"
      @onLoad="getPexelsData"
    >
      <Waterfall
        :data="pexelsList"
        :column="isMobileTerminal ? 2 : 5"
        :picturePreReading="false"
      >
        <template v-slot="{ item, width }">
          <Item-vue :item="item" :width="width" @click="toPins" />
        </template>
      </Waterfall>
    </Infinite>
    <transition
      :css="false"
      @before-enter="beforeEnter"
      @enter="enter"
      @leave="leave"
    >
      <Pins v-if="isVisiblePins" :id="currentPins.id" />
    </transition>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { ref, watch } from 'vue'
import { useEventListener } from '@vueuse/core'
import { getPexelsList } from '@/api'
import { isMobileTerminal } from '@/utils/flexible'
import useTransition from './use-transition'
import Pins from '@/views/pins/component/pins.vue'
import ItemVue from './item.vue'

const store = useStore()

// query
let query = {
  page: 1,
  size: 20
}

//  data
const pexelsList = ref([])
const loading = ref(false)
const isFinished = ref(false)
const isVisiblePins = ref(false)
const currentPins = ref({})

// hooks
const { beforeEnter, enter, leave } = useTransition(currentPins)

// watch
watch(
  () => store.getters.currentCategory,
  currentCategory => {
    resetQuery({
      page: 1,
      categoryId: currentCategory.id
    })
  }
)

watch(
  () => store.getters.searchText,
  value => {
    resetQuery({
      page: 1,
      searchText: value
    })
  }
)

// methods
useEventListener(window, 'popstate', () => {
  isVisiblePins.value = false
})

function resetQuery(newQuery) {
  pexelsList.value = []
  isFinished.value = false
  query = { ...query, ...newQuery }
}

async function getPexelsData() {
  // 如果数据加载完成 将不执行任何操作
  if (isFinished.value) return

  if (pexelsList.value.length) {
    query.page += 1
  }

  // 触发接口
  const result = await getPexelsList(query)
  if (query.page === 1) {
    pexelsList.value = result.list
  } else {
    pexelsList.value.push(...result.list)
  }

  // 数据加载 没有更多数据
  if (pexelsList.value.length === result.total) {
    isFinished.value = true
  }
  loading.value = false
}

function toPins(item) {
  isVisiblePins.value = true
  currentPins.value = item
  history.pushState(null, null, `/pins/${item.id}`)
}
</script>

<style lang="scss" scoped></style>
