<template>
  <div
    class="h-full bg-zinc-200 dark:bg-zinc-800 duration-500 overflow-auto lg:pt-1"
  >
    <div
      class="relative max-w-screen-lg mx-auto bg-white dark:bg-zinc-900 duration-500 lg:rounded-sm lg:border-zinc-200 lg:dark:border-zinc-600 lg:border lg:px-4 lg:py-2"
    >
      <!-- 移动端 navbar -->
      <Navbar sticky v-if="isMobileTerminal" :clickLeft="onNavbarLeftClick">
        个人资料
      </Navbar>
      <!-- PC 端标题 -->
      <div v-else class="text-lg font-bold text-center mb-4 dark:text-zinc-300">
        个人资料
      </div>
      <div
        class="w-full h-full px-1 pb-4 text-sm mt-2 xl:text-center lg:w-[75%]"
      >
        <!-- 头像部分 -->
        <div class="py-1 lg:absolute lg:right-[16%] text-center">
          <span
            class="w-8 inline-block mb-2 font-black text-sm dark:text-zinc-300 lg:block lg:mx-auto"
          >
            我的头像
          </span>
          <div
            class="relative w-[80px] h-[80px] group lg:cursor-pointer lg:left-[50%] lg:translate-x-[-50%]"
            @click="onAvatarClick"
          >
            <img
              :src="userInfo.avatar"
              class="rounded-full w-full h-full lg:inline-block"
              alt=""
            />
            <div
              class="absolute top-0 rounded-full w-full h-full bg-black/40 hidden lg:group-hover:block"
            >
              <Svg-icon
                name="change-header-image"
                class="w-2 h-2 m-auto mt-2"
              />
              <div
                class="text-xs text-white dark:text-zinc-300 scale-90 mt-0.5"
              >
                点击更换头像
              </div>
              <!-- 隐藏域 -->
              <input
                v-show="false"
                ref="inputFileTarget"
                type="file"
                accept=".png,.jpeg,.jpg,.gif"
                @change="onSelectImgHandler"
              />
              <p class="mt-3 text-zinc-500 dark:text-zinc-300 text-xs lg:w-10">
                支持 png、jpeg、jpg、gif 格式大小 1M 以内的图片
              </p>
            </div>
          </div>
        </div>
        <!-- 信息输入 -->
        <!-- 用户名 -->
        <div class="py-1 lg:flex lg:item-center lg:my-1">
          <span class="w-8 bloke mb-1 font-bold dark:text-zinc-300 lg:mb-0"
            >用户名</span
          >
          <Vue-input class="w-full" max="20" v-model="userInfo.nickname" />
        </div>
        <!-- 职位 -->
        <div class="py-1 lg:flex lg:item-center lg:my-1">
          <span class="w-8 bloke mb-1 font-bold dark:text-zinc-300 lg:mb-0"
            >职位</span
          >
          <Vue-input class="w-full" max="20" v-model="userInfo.title" />
        </div>
        <!-- 公司 -->
        <div class="py-1 lg:flex lg:item-center lg:my-1">
          <span class="w-8 bloke mb-1 font-bold dark:text-zinc-300 lg:mb-0"
            >公司</span
          >
          <Vue-input class="w-full" max="20" v-model="userInfo.company" />
        </div>
        <!-- 个人主页 -->
        <div class="py-1 lg:flex lg:item-center lg:my-1">
          <span class="w-8 bloke mb-1 font-bold dark:text-zinc-300 lg:mb-0"
            >个人主页</span
          >
          <Vue-input class="w-full" max="20" v-model="userInfo.homePage" />
        </div>
        <!-- 个人介绍 -->
        <div class="py-1 lg:flex lg:item-center lg:my-1">
          <span class="w-8 bloke mb-1 font-bold dark:text-zinc-300 lg:mb-0"
            >个人介绍</span
          >
          <Vue-input
            class="w-full"
            max="50"
            type="textarea"
            v-model="userInfo.introduction"
          />
        </div>
        <!-- 保存修改 -->
        <Button
          class="w-full mt-2 mb-4 dark:text-zinc-300 dark:bg-zinc-800 lg:w-[160px] lg:ml-[50%] lg:translate-x-[-50%]"
          :loading="loading"
          @click="onChangeProfile"
        >
          保存修改
        </Button>

        <!-- 退出按钮 -->
        <Button
          v-if="isMobileTerminal"
          class="w-full dark:text-zinc-300 dark:bg-zinc-800 lg:w-[160px] lg:ml-[50%] lg:translate-x-[-50%]"
          @click="onLogoutClick"
        >
          退出登录
        </Button>
      </div>
    </div>

    <!-- PC 端 -->
    <Dialog v-if="!isMobileTerminal" title="裁剪头像" v-model="isDialogVisible">
      <Change-avatar :blob="currentBlob" @close="isDialogVisible = false" />
    </Dialog>
    <!-- 移动端 -->
    <Popup v-else v-model="isDialogVisible">
      <Change-avatar :blob="currentBlob" @close="isDialogVisible = false" />
    </Popup>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useStore } from 'vuex'
import { isMobileTerminal } from '@/utils/flexible'
import { confirm, message } from '@/libs'
import { useRouter } from 'vue-router'
import { putProfile } from '@/api'
import ChangeAvatar from './components/change-avatar.vue'

const store = useStore()
const router = useRouter()
const inputFileTarget = ref(null)
const loading = ref(false)
const userInfo = ref(store.getters.userInfo)
const isDialogVisible = ref(false)
const currentBlob = ref('')

// 移动端：navbar 左侧点击事件
function onNavbarLeftClick() {
  store.commit('app/setRouterType', 'back')
  router.back()
}

// 移动端：退出登录
function onLogoutClick() {
  confirm('确定要退出登录吗？').then(() => {
    store.dispatch('user/logout')
  })
}

// 选择头像
function onAvatarClick() {
  inputFileTarget.value.click()
}

// 点击更换图片
function onSelectImgHandler() {
  // 获取选中的文件
  const imgFile = inputFileTarget.value.files[0]
  // 生成 blob (类文件对象)
  const blob = URL.createObjectURL(imgFile)
  // 获取 blob
  currentBlob.value = blob
  // 展示Dialog
  isDialogVisible.value = true
}

watch(isDialogVisible, value => {
  if (!value) {
    inputFileTarget.value.value = null
  }
})

// 保存按钮
async function onChangeProfile() {
  loading.value = true
  await putProfile(userInfo.value)
  // 同步vuex
  store.commit('user/setUserInfo', userInfo.value)
  message('success', '用户信息修改成功')
  loading.value = false
}
</script>
