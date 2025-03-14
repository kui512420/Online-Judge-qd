<template>
  <a-form ref="formRef" style="max-width: 360px; margin: 0 auto" :rules="rules" :model="form" @submit="handleSubmit" label-align="left" auto-label-width>
    <a-form-item field="name" label="账号" validate-trigger="blur">
      <a-input v-model="form.name" placeholder="请输入您的用户名" />
    </a-form-item>
    <a-form-item field="password" label="密码" validate-trigger="blur">
      <a-input-password v-model="form.password" placeholder="请输入您的密码" />
    </a-form-item>
    <a-form-item field="password2" label="确认密码" validate-trigger="blur">
      <a-input-password v-model="form.password2" placeholder="请输入您的确认密码" />
    </a-form-item>
    <a-form-item field="email" label="邮箱">
      <a-input v-model="form.email" placeholder="请输入您的邮箱" />
      <a-button html-type="submit">发送验证码</a-button>
    </a-form-item>
    <a-form-item field="match" label="验证码">
      <a-input v-model="form.match" placeholder="请输入您的邮箱验证码" />
    </a-form-item>
    <a-form-item>
      <a-button html-type="submit" style="margin-right: 20px;" size="large" type="primary">注册</a-button>

      <a-button  @click="router.push('/user/login')">去登录</a-button>
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
  password2: [
    {
      required: true,
      message: '确认密码 是必填项',
    },
    {
      validator: (value, cb) => {
        if (value !== form.password) {
          cb('两次密码输出不一致！')
        } else {
          cb()
        }
      }
    }
  ],
  email: [
    {
      type: 'email',
      required: true,
      message:"邮箱 是必填项"
    }
  ],
  match: [
    {
      required: true,
      message: '邮箱验证码 是必填项'
    }
  ],
}
</script>
<style scoped>

</style>
