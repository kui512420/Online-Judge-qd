<template>
  <a-form ref="formRef" style="max-width: 360px; margin: 0 auto" :rules="rules" :model="form" @submit="handleSubmit" label-align="left" auto-label-width>
    <a-form-item field="name" label="账号/邮箱" validate-trigger="blur">
      <a-input v-model="form.name" autocomplete="account" placeholder="请输入您的用户名/邮箱" />
    </a-form-item>
    <a-form-item field="password" label="密码" validate-trigger="blur">
      <a-input-password autocomplete="new-password" v-model="form.password" placeholder="请输入您的密码" />
    </a-form-item>
    <a-form-item field="code" label="验证码" validate-trigger="blur">
      <a-input v-model="form.code" placeholder="请输入验证码" />
      <img :src=codeImg alt="请求失败" @click="changeImg" style="width: 50px; height: 30px; border: 1px solid rebeccapurple;">
    </a-form-item>
    <a-form-item>
      <a-button html-type="handleSubmit" :loading="loginLoding" style="margin-right: 20px;" size="large" type="primary">登录</a-button>
      <a-button  @click="router.push('/user/register')">去注册</a-button>
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts">
import router from '@/router';
import { reactive, ref } from 'vue';
import { UserControllerService } from '@/generated';
import { Notification } from '@arco-design/web-vue';
const codeImg = ref("http://127.0.0.1:5210/api/user/captcha?t=")
const changeImg = ()=>{
  codeImg.value = "http://127.0.0.1:5210/api/user/captcha?t="+new Date()
}
const form = reactive({
  name: '',
  password: '',
  code:''
});
const loginLoding = ref(false)
const handleSubmit = () => {
  loginLoding.value = true
  UserControllerService.registerUsingPost({"user":form.name,"password":form.password,code:form.code}).then((res)=>{
    if(res.code===200){
      Notification.success(res.message)
      // 本地存储双token
      localStorage.setItem("accessToken",res.data.accessToken)
      localStorage.setItem("refreshToken",res.data.RefreshToken)
      //返回首页
      router.push("/")
    }else{
      Notification.error(res.message)
    }
    loginLoding.value = false
  })
}
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
