<template>
  <div
    class="h-full overflow-auto bg-white dark:bg-zinc-800 duration-300 scrollbar-thin scrollbar-thumb-transparent lg:scrollbar-thumb-zinc-200 lg:dark:scrollbar-thumb-zinc-900 scrollbar-track-transparent"
  >
    <Navigation-vue />
    <div class="max-w-screen-xl mx-auto relative m-1">
      <List-vue />
    </div>

    <!-- 移动端下的 tabBar -->
    <Trigger-menu
      v-if="isMobileTerminal"
      class="fixed bottom-6 m-auto left-0 right-0 w-[220px]"
    >
      <Trigger-menu-item
        icon="home"
        iconClass="fill-zinc-900 dark:fill-zinc-500"
        to="/"
      >
        首页
      </Trigger-menu-item>
      <Trigger-menu-item
        v-if="$store.getters.token"
        icon="vip"
        iconClass="fill-zinc-400 dark:fill-zinc-500"
        textClass="text-zinc-400 dark:text-zinc-500"
        @click="onVipClick"
      >
        VIP
      </Trigger-menu-item>
      <Trigger-menu-item
        icon="profile"
        iconClass="fill-zinc-400 dark:fill-zinc-500"
        textClass="text-zinc-400 dark:text-zinc-500"
        @click="onMyClick"
      >
        {{ $store.getters.token ? ' 我的' : '登录 ' }}
      </Trigger-menu-item>
    </Trigger-menu>
  </div>
</template>

<script setup>
import NavigationVue from './components/navigation/index.vue'
import ListVue from './components/list/index.vue'
import { isMobileTerminal } from '@/utils/flexible'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

function onVipClick() {}

function onMyClick() {
  store.commit('app/setRouterType', 'push')
  if (store.getters.token) {
    router.push('/profile')
  } else {
    router.push('/login')
  }
}
</script>
