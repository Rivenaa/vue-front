<template>
  <div class="h-full bg-zinc-200 dark:bg-zinc-800 duration-300 lg:pt-1">
    <div
      class="max-w-screen-lg mx-auto bg-white dark:bg-zinc-900 duration-300 lg:rounded-sm lg:border-zinc-200 lg:dark:border-zinc-600 lg:border-[1px]"
    >
      <!-- 移动端 navbar 处理 -->
      <Navbar v-if="isMobileTerminal" sticky :clickLeft="onNavbarLeftClick">
        精选会员
      </Navbar>
      <div class="py-2 px-1">
        <h2
          class="text-center text-[34px] font-bold tracking-widest text-yellow-600"
        >
          精选VIP
        </h2>
        <p class="text-center text-yellow-500 text-lg">
          升级精选VIP,畅想所有内容
        </p>
        <div
          class="flex justify-between mt-5 overflow-auto pb-2 scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-700 scrollbar-track-transparent"
        >
          <Pay-menu-item
            v-for="item in payListData"
            :key="item.id"
            :hot="item.isHot"
            :select="item.id === currentPayData.id"
            :item="item"
            @click="onChangeCurrentPay(item)"
          />
        </div>
        <p class="mt-1 text-sm text-zinc-500">{{ currentPayData.desc }}</p>
        <Payment class="mt-4" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getVipPayList } from '@/api'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { isMobileTerminal } from '@/utils/flexible'
import PayMenuItem from './components/pay-menu-item.vue'
import Payment from './components/payment.vue'
import CountDown from '../../libs/count-down/index.vue'

const router = useRouter()
const store = useStore()
const payListData = ref([])
const currentPayData = ref({})

getVipPayList().then(res => {
  payListData.value = res
  currentPayData.value = res[0]
  console.log(currentPayData.value)
})

function onNavbarLeftClick() {
  store.commit('app/setRouteType', 'back')
  router.back()
}

function onChangeCurrentPay(item) {
  currentPayData.value = item
}
</script>
