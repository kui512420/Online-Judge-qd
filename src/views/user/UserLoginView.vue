<template>
  <a-form ref="formRef" style="max-width: 360px; margin: 0 auto" :rules="rules" :model="form" @submit="handleSubmit" label-align="left" auto-label-width>
    <a-form-item field="name" label="账号/邮箱" validate-trigger="blur">
      <a-input v-model="form.name" placeholder="请输入您的用户名/邮箱" />
    </a-form-item>
    <a-form-item field="password" label="密码" validate-trigger="blur">
      <a-input-password v-model="form.password" placeholder="请输入您的密码" />
    </a-form-item>
    <a-form-item field="code" label="验证码" validate-trigger="blur">
      <a-input v-model="form.code" placeholder="请输入验证码" />
      <img src="https://kuikui.space/api/code/captcha?t=" alt="请求失败" style="width: 50px; height: 30px; border: 1px solid rebeccapurple;">
    </a-form-item>
    <a-form-item>
      <a-button html-type="submit" style="margin-right: 20px;" size="large" type="primary">登录</a-button>
      <a-button  @click="router.push('/user/register')">去注册</a-button>
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts">
import router from '@/router';
import { reactive } from 'vue';
const handleSubmit = ({ values, errors }) => {
  console.log('values:', values, '\nerrors:', errors)
}

const form = reactive({
  name: '',
  password: '',
  code:''
});
const rules = {
  name: [
    {
      required: true,
      message: '用户名 是必填项',
    },
  ],
  password: [
    {
      required: true,
      message: '密码 是必填项',
    },
  ],
  code: [
    {
      required: true,
      message:"验证码 是必填项"
    }
  ]
}
</script>
<style scoped>

</style>
