<template>
  <Vee-form class="form">
    <h1>register</h1>
    <Vee-field
      class="input"
      type="text"
      placeholder="用户名"
      name="username"
      autocomplete="on"
      :rules="validateUsername"
    />
    <Vee-error-message name="username" class="error-message" />
    <Vee-field
      class="input"
      type="password"
      name="password"
      placeholder="密码"
      :rules="validatePassword"
    />
    <Vee-error-message name="password" class="error-message" />
    <Vee-field
      class="input"
      type="password"
      name="password"
      placeholder="确认密码"
      :rules="validateConfirmPassword"
    />
    <Vee-error-message name="password" class="error-message" />
    <Button class="button">注册</Button>
  </Vee-form>
</template>

<script setup>
import { ref } from 'vue'
import {
  Form as VeeForm,
  Field as VeeField,
  ErrorMessage as VeeErrorMessage
} from 'vee-validate'
import {
  validateUsername,
  validatePassword,
  validateConfirmPassword
} from '../validate'
</script>

<style lang="scss" scoped>
@import '@/styles/form.scss';
</style>
