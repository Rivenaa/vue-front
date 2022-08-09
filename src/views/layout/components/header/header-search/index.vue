<template>
  <div class="w-full">
    <Search v-model="inputValue" @search="onSearchHandler">
      <template #dropdown>
        <div>
          <!-- 搜索提示 -->
          <Hint
            :searchText="inputValue"
            v-show="inputValue"
            @itemClick="onSearchHandler"
          />
          <!-- 搜索历史 -->
          <History v-show="!inputValue" @itemClick="onSearchHandler" />
          <!-- 主题 -->
          <Theme v-show="!inputValue" />
        </div>
      </template>
    </Search>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import Hint from './hint.vue'
import History from './history.vue'
import Search from '@/libs/search/index.vue'
import Theme from './theme.vue'

const inputValue = ref('')
const store = useStore()

function onSearchHandler(value) {
  inputValue.value = value
  if (value) {
    store.commit('search/addHistory', value)
    store.commit('app/setSearchText', value)
  }
}
</script>

<style lang="scss" scoped></style>
