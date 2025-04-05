<template>
  <a-form ref="formRef" style="max-width: 360px; margin: 0 auto" :rules="rules" :model="form" @submit="handleSubmit" label-align="left" auto-label-width>
    <a-form-item field="name" label="账号" validate-trigger="blur">
      <a-input autocomplete="new-Account" v-model="form.name" placeholder="请输入您的用户名" />
    </a-form-item>
    <a-form-item field="password" label="密码" validate-trigger="blur">
      <a-input-password autocomplete="new-password" v-model="form.password" placeholder="请输入您的密码" />
    </a-form-item>
    <a-form-item field="password2" label="确认密码" validate-trigger="blur">
      <a-input-password autocomplete="new-password" v-model="form.password2" placeholder="请输入您的确认密码" />
    </a-form-item>
    <a-form-item field="email" label="邮箱">
      <a-input v-model="form.email" placeholder="请输入您的邮箱" />
      <SendButton :email="form.email"></SendButton>
    </a-form-item>
    <a-form-item field="code" label="验证码">
      <a-input v-model="form.code" placeholder="请输入您的邮箱验证码" />
    </a-form-item>
    <a-form-item>
      <a-button :loading="registerLoding" html-type="submit" style="margin-right: 20px;" size="large" type="primary">注册</a-button>
      <a-button  @click="router.push('/user/login')">去登录</a-button>
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts">
import router from '@/router';
import { reactive, ref } from 'vue';
import { UserControllerService } from '@/generated';
import { Notification } from '@arco-design/web-vue';
import SendButton from '@/components/email/SendButton.vue';
const registerLoding = ref(false)


const form = reactive({
  name: '',
  password: '',
  password2:'',
  email:'',
  code:""
});
const handleSubmit = () => {
  registerLoding.value = true
  UserControllerService.registerUsingPost1({"userAccount":form.name,"userPassword":form.password,"userCheakPassword":form.password2,"email":form.email,"emailCode":form.code}).then((res)=>{
    if(res.code===200){
      Notification.success(res.message)
      // 本地存储双token
      localStorage.setItem("AccessToken",res.data.accessToken)
      localStorage.setItem("RefreshToken",res.data.RefreshToken)
      //返回首页
      router.push("/")
    }else{
      Notification.error(res.message)
    }
    registerLoding.value = false
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
  password2: [
    {
      required: true,
      message: '确认密码 是必填项',
    },
    {
      validator: (value: string, cb: (arg0: string | undefined) => void) => {
        if (value !== form.password) {
          cb('两次密码输出不一致！')
        } else {
          cb("")
        }
      }
    }
  ],
  email: [
    {
      type: 'email',
      required: true,
      message:"请输入正确的邮箱"
    }
  ],
  code: [
    {
      required: true,
      message: '邮箱验证码 是必填项'
    }
  ],
}
</script>
<style scoped>

</style>
