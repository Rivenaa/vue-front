<template>
  <Vee-form class="form">
    <h1>login</h1>
    <Vee-field
      class="input"
      type="text"
      name="username"
      placeholder="用户名"
      :rules="validateUsername"
      v-model="loginForm.username"
    />
    <Vee-error-message name="username" class="error-message" />
    <Vee-field
      class="input"
      type="password"
      name="password"
      placeholder="密码"
      :rules="validatePassword"
      v-model="loginForm.password"
    />
    <Vee-error-message name="password" class="error-message" />
    <Button class="button" @click="onLoginHandler" :loading="loading"
      >登录</Button
    >
  </Vee-form>
  <Slider-captcha
    v-if="isCaptchaVisible"
    class="z-50 mt-5 mx-auto"
    @close="isCaptchaVisible = false"
    @success="onCaptchaSuccess"
  />
</template>

<script setup>
import { ref } from 'vue'
import {
  Form as VeeForm,
  Field as VeeField,
  ErrorMessage as VeeErrorMessage
} from 'vee-validate'
import { validateUsername, validatePassword } from '../validate'
import SliderCaptcha from './slider-captcha.vue'
import { LOGIN_TYPE } from '@/constants'
import { useStore } from 'vuex'
import { message } from '@/libs'

const store = useStore()
const isCaptchaVisible = ref(false)
const loading = ref(false)
const loginForm = ref({
  username: '',
  password: ''
})

function onLoginHandler() {
  loading.value = true
  try {
    store
      .dispatch('user/login', {
        ...loginForm.value,
        loginType: LOGIN_TYPE.username
      })
      .then(() => {
        isCaptchaVisible.value = true
      })
      .catch(err => {
        message('error', err.toString().split(':')[1], 3000)
      })
  } finally {
    loading.value = false
  }
}

function onCaptchaSuccess() {
  isCaptchaVisible.value = false
}

function onLogin() {}
</script>

<style lang="scss" scoped>
@import '@/styles/form.scss';
</style>
