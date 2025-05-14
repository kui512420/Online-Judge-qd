<template>
  <div class="login-container">
    <a-form ref="formRef" class="login-form" :rules="rules" :model="form" @submit="handleSubmit" label-align="left"
      auto-label-width>
      <h2 class="form-title">欢迎登录</h2>
      <a-form-item field="name" :hide-label="true">
        <a-input v-model="form.name" placeholder="用户名/邮箱" allow-clear class="custom-input">
          <template #prefix>
            <icon-user />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item field="password" :hide-label="true">
        <a-input-password v-model="form.password" placeholder="密码" allow-clear class="custom-input">
          <template #prefix>
            <icon-lock />
          </template>
        </a-input-password>
      </a-form-item>
      <a-form-item field="code" :hide-label="true">
        <div class="captcha-wrapper">
          <a-input v-model="form.code" placeholder="验证码" class="captcha-input">
            <template #prefix>
              <icon-safe />
            </template>
          </a-input>
          <img :src="codeImg" @click="changeImg" class="captcha-image" />
        </div>
      </a-form-item>
      <a-form-item>
        <a-button html-type="submit" :loading="loginLoding" class="login-btn" type="primary">
          立即登录
        </a-button>
        <div class="action-links">
          <a-link @click="router.push('/user/register')">注册账号</a-link>
        </div>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import router from '@/router'
import { reactive, ref } from 'vue'
import { UserControllerService } from '@/generated'
import { Notification } from '@arco-design/web-vue'
import { IconUser, IconLock, IconSafe } from '@arco-design/web-vue/es/icon'
const codeImg = ref('/api/user/captcha?t=')
const changeImg = () => {
  codeImg.value = '/api/user/captcha?t=' + new Date()
}
const form = reactive({
  name: '',
  password: '',
  code: '',
})
const loginLoding = ref(false)
const handleSubmit = () => {
  loginLoding.value = true
  UserControllerService.login({ user: form.name, password: form.password, code: form.code }).then(
    (res) => {
      if (res.code === 200) {
        Notification.success({
          title: '登录成功',
          content: '',
          position: 'bottomRight',
        })
        // 本地存储双token
        localStorage.setItem('AccessToken', res.data.AccessToken)
        //返回首页
        router.replace('/')
      } else if (res.code === 40300) {
        // 用户被禁用的特殊处理
        Notification.error({
          title: '账号已被禁用',
          content: '您的账号已被禁用，请联系管理员',
          position: 'bottomRight',
          duration: 5000
        })
        // 登录失败时刷新验证码
        changeImg()
      } else {
        Notification.error(res.message)
        // 登录失败时刷新验证码
        changeImg()
      }
      loginLoding.value = false
    },
  ).catch(error => {
    console.error('登录失败:', error);
    loginLoding.value = false;
    Notification.error('登录失败，请稍后重试');
    // 登录失败时刷新验证码
    changeImg()
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
      message: '验证码 是必填项',
    },
  ],
}
</script>
<style scoped>
.login-container {
  display: flex;
  width: 100%;
  align-items: center;
}

.login-form {
  width: 80%;
  max-width: 500px;
  margin: 0 auto;
  padding: 40px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.form-title {
  text-align: center;
  margin-bottom: 32px;
  color: #1a2b6d;
  font-size: 24px;
}

.custom-input {
  height: 48px;
  border-radius: 8px;
}

.captcha-wrapper {
  display: flex;
  gap: 12px;
  width: 100%;
}

.captcha-input {
  flex: 1;
}

.captcha-image {
  width: 120px;
  height: 48px;
  border-radius: 6px;
  cursor: pointer;
  border: 1px solid var(--color-border);
}

.login-btn {
  width: 80%;
  height: 48px;
  font-size: 16px;
  background: linear-gradient(90deg, #646cff 0%, #747bff 100%);
  transition: all 0.3s;
}

.login-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(100, 108, 255, 0.3);
}

.action-links {
  margin-top: 16px;
  display: flex;
  justify-content: space-between;
}
</style>
