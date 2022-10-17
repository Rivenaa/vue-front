<template>
  <div class="body">
    <div class="container text-xl">
      <div ref="formBoxRef" class="form-box">
        <VeeForm ref="registerRef" class="register hidden">
          <h1>register</h1>
          <VeeField
            type="text"
            placeholder="用户名"
            name="username"
            autocomplete="on"
            :rules="validateUsername"
          />
          <VeeErrorMessage name="username" />
          <VeeField type="password" placeholder="密码" />
          <VeeField type="password" placeholder="确认密码" />
          <button>注册</button>
        </VeeForm>
        <VeeForm ref="loginRef" class="login">
          <h1>login</h1>
          <Vee-field type="text" placeholder="用户名" />
          <Vee-field type="password" placeholder="密码" />
          <button>登录</button>
        </VeeForm>
      </div>
      <div class="box box-left">
        <img src="@/assets/images/che.jpg" alt="" />
        <button @click="toLogin">已有账号，去登录</button>
      </div>
      <div class="box box-right">
        <img src="@/assets/images/che1.jpg" alt="" />
        <button @click="toRegister">没有账号，去注册</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {
  Form as VeeForm,
  Field as VeeField,
  ErrorMessage as VeeErrorMessage
} from 'vee-validate'
/* import {
  validateUsername,
  validatePassword,
  validateConfirmPassword
} from './validate' */

const formBoxRef = ref(null)
const loginRef = ref(null)
const registerRef = ref(null)

function toLogin() {
  formBoxRef.value.style.transform = 'translateX(0%)'
  registerRef.value.classList.add('hidden')
  loginRef.value.classList.remove('hidden')
}
function toRegister() {
  formBoxRef.value.style.transform = 'translateX(100%)'
  loginRef.value.classList.add('hidden')
  registerRef.value.classList.remove('hidden')
}
</script>

<style lang="scss" scoped>
.body {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(200deg, #f3e7e9, #e3eeff);

  .container {
    background-color: #fff;
    width: 650px;
    height: 415px;
    border-radius: 5px;
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.1);
    position: relative;

    .form-box {
      position: absolute;
      top: 0;
      left: 0;
      background-color: #d3b7d8;
      width: 325px;
      height: 415px;
      border-radius: 5px;
      box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 2;
      transition: 0.5s ease-in-out;

      .register,
      .login {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        h1 {
          text-align: center;
          margin-bottom: 25px;
          text-transform: uppercase;
          color: #fff;
          letter-spacing: 5px;
        }
        input {
          background-color: transparent;
          width: 70%;
          color: #fff;
          border: none;
          border-bottom: 1px solid rgba(255, 255, 255, 0.4);
          padding: 10px 0;
          text-indent: 10px;
          margin: 8px 0;
          font-size: 14px;
          letter-spacing: 2px;
        }
        input::placeholder {
          color: #fff;
        }
        input:focus {
          color: #a262ad;
          outline: none;
          border: 2px solid #a262ad80;
          transition: 0.5s;
        }
        input:focus::placeholder {
          opacity: 0;
        }
        button {
          width: 70%;
          margin-top: 35px;
          background-color: #f6f6f6;
          outline: none;
          border-radius: 8px;
          padding: 13px;
          color: #a262ad;
          letter-spacing: 2px;
          border: none;
          cursor: pointer;
          font-size: 0.4rem;
        }
        button:hover {
          background-color: #a262ad;
          color: #f6f6f6;
          transition: background-color 0.5s ease;
        }
      }
      .hidden {
        display: none;
      }
    }

    .box {
      width: 50%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      img {
        width: 150px;
        height: 150px;
        opacity: 0.9;
        margin: 40px 0;
      }
      button {
        font-size: 0.35rem;
        margin-top: 3%;
        background-color: #fff;
        color: #a262ad;
        border: 1px solid #d3b7d8;
        padding: 6px 10px;
        border-radius: 5px;
        letter-spacing: 1px;
        outline: none;
        cursor: pointer;
      }
      button:hover {
        background-color: #d3b7d8;
        color: #fff;
      }
    }
    .box-left {
      left: -2%;
    }
    .box-right {
      right: -2%;
    }
  }
}
</style>
