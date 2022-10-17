<template>
  <router-view v-slot="{ Component }">
    <transition
      :name="transitionName"
      @before-enter="beforeEnter"
      @after-leave="afterLeave"
    >
      <keep-alive :include="viralTaskStack">
        <component
          :is="Component"
          :class="{ 'fixed top-0 left-0 w-screen z-50': isAnimation }"
          :key="$router.fullPath"
        />
      </keep-alive>
    </transition>
  </router-view>
</template>

<script>
const NONE = 'none'
const ROUTER_TYPE_PUSH = 'push'
const ROUTER_TYPE_BACK = 'back'

const ROUTER_TYPE_ENUM = [NONE, ROUTER_TYPE_PUSH, ROUTER_TYPE_BACK]
</script>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  // 路由的跳转类型 进入组件、离开组件
  routerType: {
    type: String,
    default: NONE,
    validator(val) {
      const result = ROUTER_TYPE_ENUM.includes(val)
      if (!result) {
        throw new Error(
          `routerType 必须是 ${ROUTER_TYPE_ENUM.join(',')} 中的一个`
        )
      }
      return result
    }
  },
  // 首页的组件名称
  mainComponentName: {
    type: String,
    required: true
  }
})

const router = useRouter()
const transitionName = ref('')
const isAnimation = ref('false')
const viralTaskStack = ref([props.mainComponentName]) // 虚拟任务栈

router.beforeEach((to, from) => {
  transitionName.value = props.routerType
  if (props.routerType === ROUTER_TYPE_PUSH) {
    // 入栈
    viralTaskStack.value.push(to.name)
  } else if (props.routerType === ROUTER_TYPE_BACK) {
    // 出栈
    viralTaskStack.value.pop()
  }

  if (to.name === props.mainComponentName) {
    clearStack()
  }
})

function beforeEnter() {
  isAnimation.value = true
}
function afterLeave() {
  isAnimation.value = false
}
function clearStack() {
  viralTaskStack.value = [props.mainComponentName]
}
</script>

<style lang="scss" scoped>
// push页面时: 新页面的进入动画
.push-enter-active {
  animation-name: push-in;
  animation-duration: 0.4s;
}
// push页面时：老页面的退出动画
.push-leave-active {
  animation-name: push-out;
  animation-duration: 0.4s;
}

// push页面时: 新页面的进入动画
@keyframes push-in {
  0% {
    transform: translate(100%, 0);
  }
  100% {
    transform: translate(0, 0);
  }
}

// push页面时：老页面的退出动画
@keyframes push-out {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(-50%, 0);
  }
}

// back页面时：即将展示的页面动画
.back-enter-active {
  animation-name: back-in;
  animation-duration: 0.4s;
}

// back页面时: 后退的页面执行的动画
.back-leave-active {
  animation-name: back-out;
  animation-duration: 0.4s;
}

// back页面时：即将展示的页面动画
@keyframes back-in {
  0% {
    width: 100%;
    transform: translate(-100%, 0);
  }
  100% {
    width: 100%;
    transform: translate(0, 0);
  }
}

// back页面时: 后退的页面执行的动画
@keyframes back-out {
  0% {
    width: 100%;
    transform: translate(0, 0);
  }
  100% {
    width: 100%;
    transform: translate(50%, 0);
  }
}
</style>
