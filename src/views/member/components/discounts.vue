<template>
  <div
    class="flex justify-center items-center py-0.5 bg-orange-100 border-t lg:border lg:rounded-sm"
    v-if="!isCountDownFinish"
  >
    <Svg-icon
      name="countdown"
      class="w-1.5 h-1.5 mr-1"
      fillClass="fill-red-600"
    />
    <p class="text-xs text-red-600 font-bold">
      限时优惠 | 距离优惠结束仅剩
      <Count-down
        class="inline-block"
        @finish="isCountDownFinish = true"
        time="52*60*1000"
      />
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
// 倒计时是否结束
const isCountDownFinish = ref(false)
</script>
