<template>
      <div >
        <template v-if="useStore.user.userRole !== 'notLogin'">
          <a-dropdown @select="handleSelect" trigger="hover">
            <a-avatar>
              <img alt="avatar"
                src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp" />
            </a-avatar>
            <template #content>
              <a-doption @click="toPersonCenter">个人中心</a-doption>
              <a-doption @click="loginOUt">退出登录</a-doption>
            </template>
          </a-dropdown>

        </template>
        <template v-else>
          <a-button @click="goLoginPage">登录</a-button>
        </template>
      </div>
</template>

<script setup lang='ts'>
import { useUserStore } from '@/stores/userStore'
import router from '@/router/index';
import { Message } from '@arco-design/web-vue';
const useStore = useUserStore()
const toPersonCenter =()=>{
  router.push('/personalCenter')
}
const loginOUt = () => {
  useStore.user.userRole = 'notLogin'
  localStorage.removeItem("AccessToken")
  localStorage.removeItem("RefreshToken")
  Message.success("退出登录")
}

const goLoginPage = () => {
  router.push('user/login')
}
const handleSelect = (event: string) => {
  console.log(event)
}
</script>
<style scoped>
</style>
