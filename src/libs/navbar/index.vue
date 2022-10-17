<template>
  <div
    class="w-full h-5 border-b flex items-center z-10 bg-white dark:bg-zinc-800 border-b-zinc-200 dark:border-b-zinc-700"
    :class="[sticky ? 'sticky top-0 left-0' : 'relative']"
  >
    <!-- 左 -->
    <div
      class="w-5 h-full absolute left-0 flex items-center justify-center"
      @click="onClickLeft"
    >
      <slot name="left">
        <Svg-icon
          name="back"
          class="w-2 h-2"
          fillClass=" fill-zinc-900 dark:fill-zinc-200"
        />
      </slot>
    </div>
    <!-- 中 -->
    <div
      class="h-full flex items-center justify-center m-auto font-bold text-base text-zinc-900 dark:text-zinc-200"
    >
      <slot />
    </div>
    <!-- 右 -->
    <div
      class="w-5 h-full absolute right-0 flex items-center justify-center"
      @click="onClickRight"
    >
      <slot name="right" />
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({
  clickLeft: Function,
  clickRight: Function,
  sticky: Boolean
})

const router = useRouter()

function onClickLeft() {
  if (props.clickLeft) {
    props.clickLeft()
    return
  }
  router.back()
}

function onClickRight() {
  if (props.clickRight) {
    props.clickRight()
  }
}
</script>

<style lang="scss" scoped></style>
