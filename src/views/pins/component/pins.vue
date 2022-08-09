<template>
  <div
    class="fixed top-0 left-0 w-screen h-screen text-xl z-20 backdrop-blur-4xl bg-transparent pb-2 overflow-y-auto lg:p-2"
  >
    <!-- 移动端下的navbar -->
    <Navbar v-if="isMobileTerminal" sticky>
      {{ pexelsData.title }}
      <template #right>
        <Svg-icon
          name="share"
          class="w-2.5 h-2.5"
          fillClass="fill-zinc-900 dark:fill-zinc-200"
        />
      </template>
    </Navbar>
    <!-- PC 端 -->
    <Svg-icon
      v-else
      name="close"
      class="w-3 h-3 ml-1 p-0.5 cursor-pointer duration-200 rounded-sm hover:bg-zinc-100 absolute top-2 right-2"
      fillClass="fill-zinc-400"
      @click="onPop"
    />

    <!-- 内容区 -->
    <div
      v-if="pexelsData.title"
      class="lg:w-[80%] lg:h-full lg:mx-auto lg:rounded-lg lg:flex"
    >
      <img
        class="w-screen mb-2 lg:w-3/5 lg:h-full lg:rounded-tl-lg lg:rounded-bl-lg"
        :src="pexelsData.photo"
        alt=""
      />
      <div
        class="lg:w-2/5 lg:h-full lg:bg-white lg:dark:bg-zinc-900 lg:rounded-tr-lg lg:rounded-tb-lg xl:rounded-tb-lg lg:p-3"
      >
        <div v-if="!isMobileTerminal" class="flex justify-between mb-2">
          <!-- 分享 -->
          <Svg-icon
            name="share"
            class="w-4 h-4 p-[6px] cursor-pointer hover:bg-zinc-200 dark:hover-zinc-800 duration-200 rounded"
          >
          </Svg-icon>
          <!-- 收藏 -->
          <Button
            type="info"
            icon="heart"
            iconClass="fill-zinc-900 dark:fill-zicn-200"
          >
          </Button>
        </div>
        <!-- 标题 -->
        <p
          class="text-base text-zinc-900 dark:text-zinc-200 ml-1 font-bold lg:text-xl lg:mb-5"
        >
          {{ pexelsData.title }}
        </p>
        <!-- 作者 -->
        <div class="flex items-center mt-1 px-1">
          <img v-lazy class="w-3 h-3 rounded-full" :src="pexelsData.avatar" />
          <span class="text-base text-zinc-900 dark:text-zinc-200 ml-1">
            {{ pexelsData.author }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getPexels } from '@/api'
import { isMobileTerminal } from '@/utils/flexible'
import { useStore } from 'vuex'

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const router = useRouter()
const store = useStore()
const pexelsData = ref({})

getPexels(props.id).then(res => {
  pexelsData.value = res
})

function onPop() {
  store.commit('app/setRouterType', 'back')
  router.back()
}
</script>

<style lang="scss" scoped></style>
