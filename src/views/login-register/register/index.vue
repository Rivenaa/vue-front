<template>
  <div
    class="relative h-screen bg-white dark:bg-zinc-800 text-center lg:bg-zinc-200"
  >
    <!-- PC端 头部图标 -->
    <div class="hidden pt-5 h-8 lg:block">
      <img
        class="m-auto"
        src="https://res.lgdsunday.club/signlogo.png"
        alt=""
      />
    </div>
    <!-- 移动端 头部图标 -->
    <div class="h-[111px] lg:hidden">
      <img
        src="https://res.lgdsunday.club/login-bg.png"
        class="dark:hidden"
        alt=""
      />
      <img
        src="https://m.imooc.com/static/wap/static/common/img/logo-small@2x.png"
        class="h-5 absolute top-[5%] left-[50%] translate-x-[-50%]"
        alt=""
      />
    </div>
    <!-- 表单区 -->
    <div
      class="block px-3 dark:bg-zinc-800 lg:bg-white lg:w-[388px] lg:dark:bg-zinc-900 lg:m-auto lg:mt-8 lg:pt-4 lg:rounded-sm lg:shadow-lg"
    >
      <!-- 标题 -->
      <h3
        class="hidden mb-2 font-semibold text-base text-main dark:text-zinc-300 lg:block"
      >
        注册账号
      </h3>
      <!-- 表单 -->
      <Vee-form @submit="onRegHandler">
        <!-- 用户名 -->
        <Vee-field
          class="dark:bg-zinc-800 dark:text-zinc-400 border-b-zinc-400 border-b w-full outline-none pb-1 px-1 text-base focus:border-b-main dark:focus:border-zinc-200 lg:dark:bg-zinc-900"
          type="text"
          name="username"
          placeholder="用户名"
          autocomplete="on"
          :rules="validateUsername"
          v-model="regFrom.username"
        />
        <Vee-error-message
          name="username"
          class="text-sm text-red-600 block mt-0.5 text-left"
        />
        <!-- 密码 -->
        <Vee-field
          class="dark:bg-zinc-800 dark:text-zinc-400 border-b-zinc-400 border-b w-full outline-none pb-1 px-1 text-base focus:border-b-main dark:focus:border-zinc-200 lg:dark:bg-zinc-900"
          type="password"
          name="password"
          placeholder="密码"
          autocomplete="on"
          :rules="validatePassword"
          v-model="regFrom.password"
        />
        <Vee-error-message
          name="password"
          class="text-sm text-red-600 block mt-0.5 text-left"
        />
        <!-- 确认密码 -->
        <Vee-field
          class="dark:bg-zinc-800 dark:text-zinc-400 border-b-zinc-400 border-b w-full outline-none pb-1 px-1 text-base focus:border-b-main dark:focus:border-zinc-200 lg:dark:bg-zinc-900"
          type="password"
          name="confirmPassword"
          placeholder="确认密码"
          autocomplete="on"
          rules="validateConfirmPassword:@password"
          v-model="regFrom.confirmPassword"
        />
        <Vee-error-message
          name="confirmPassword"
          class="text-sm text-red-600 block mt-0.5 text-left"
        />
        <!-- 跳转登录 -->
        <div class="pt-1 pb-3 leading-[0px] text-right">
          <a
            @click="toLogin"
            class="inline-block p-1 text-zinc-400 dark:text-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-400 text-sm duration-300 cursor-pointer"
            >账号登录</a
          >
        </div>

        <!-- 注册协议 -->
        <div class="text-center">
          <a
            href="https://m.imooc.com/newfaq?id=89"
            class="text-zinc-400 dark:text-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-400 text-sm durantion-300"
            target="__black"
          >
            注册并同意《慕课网注册协议》
          </a>
        </div>
        <!-- 注册按钮 -->
        <Button
          :isActiveAnim="false"
          :loading="loading"
          class="w-full dark:bg-zinc-900 lg:dark:bg-zinc-800"
        >
          注册按钮
        </Button>
      </Vee-form>
      <!-- 第三方登录 -->
      <div class="flex justify-around mt-4">
        <!-- QQ -->
        <Svg-icon class="w-4 cursor-pointer" name="qq" />
        <!-- 微信 -->
        <Svg-icon class="w-4 cursor-pointer" name="wexin" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from '@vue/reactivity'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import {
  Form as VeeForm,
  Field as VeeField,
  ErrorMessage as VeeErrorMessage,
  defineRule
} from 'vee-validate'
import {
  validateUsername,
  validatePassword,
  validateConfirmPassword
} from '../validate'
import { LOGIN_TYPE } from '@/constants'
import { message } from '@/libs'

const router = useRouter()
const store = useStore()
const loading = ref(false)
const regFrom = ref({
  username: '',
  password: '',
  confirmPassword: ''
})

// 定义规则
defineRule('validateConfirmPassword', validateConfirmPassword)

function toLogin() {
  store.commit('app/setRouterType', 'push')
  router.push('/login')
}

async function onRegHandler() {
  try {
    loading.value = true
    const playload = {
      username: regFrom.value.username,
      password: regFrom.value.password
    }
    await store.dispatch('user/register', playload)
    await store.dispatch('user/login', {
      ...playload,
      loginType: LOGIN_TYPE.username
    })
    router.push('/')
  } catch (error) {
    const err = (error + '').split(':')[1]
    message('error', err)
  } finally {
    loading.value = false
  }
}
</script>

<style lang="scss" scoped></style>
