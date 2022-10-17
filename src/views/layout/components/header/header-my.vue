<template>
  <Popover v-if="$store.getters.userInfo" class="flex items-center">
    <template #reference>
      <div
        class="relative flex items-center p-0.5 rounded-sm cursor-pointer duration-200 outline-none hover:bg-zinc-100 dark:hover:bg-zinc-900"
      >
        <!-- 头像 -->
        <img
          v-lazy
          class="w-3 h-3 rounded-sm"
          :src="$store.getters.userInfo.avatar"
        />
        <!-- 下箭头 -->
        <Svg-icon
          class="h-1.5 w-1.5 ml-0.5"
          name="down-arrow"
          fillClass="fill-zinc-900 dark:fill-zinc-300"
        />
        <Svg-icon
          v-if="$store.getters.userInfo.vipLevel"
          class="h-1.5 w-1.5 absolute right-[16px] bottom-0"
          name="vip"
        />
      </div>
    </template>
    <div class="w-[140px] overflow-hidden">
      <div
        v-for="item in menuArr"
        :key="item.id"
        class="flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/60 dark:hover:bg-zinc-800"
        @click="onItemClick(item)"
      >
        <Svg-icon
          :name="item.icon"
          class="w-1.5 h-1.5 mr-1"
          fillClass="fill-zinc-900 dark:fill-zinc-300"
        />
        <span class="text-zinc-800 dark:text-zinc-300 text-sm">{{
          item.title
        }}</span>
      </div>
    </div>
  </Popover>
  <div v-else>
    <Button icon="profile" iconColor="#fff" @click="toLogin" />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { confirm } from '@/libs'

const menuArr = [
  {
    id: 0,
    title: '个人资料',
    icon: 'profile',
    path: '/profile'
  },
  {
    id: 1,
    title: '升级vip',
    icon: 'vip-profile',
    path: '/member'
  },
  {
    id: 2,
    title: '退出登录',
    icon: 'logout',
    path: ''
  }
]

const router = useRouter()
const store = useStore()

function toLogin() {
  store.commit('app/setRouterType', 'push')
  router.push('/login-register')
}

function onItemClick(item) {
  if (item.id === 2) {
    confirm('您确定要退出登录吗？').then(() => {
      store.dispatch('user/logout')
    })
    return
  }
  store.commit('app/setRouterType', 'push')
  router.push(item.path)
}
</script>

<style lang="scss" scoped></style>
