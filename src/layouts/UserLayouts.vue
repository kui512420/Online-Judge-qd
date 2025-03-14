<template>
  <div class="Wapper">
    <a-layout style="min-height: 100vh;">
      <a-layout-header class="header">
        <a-space>
          <img src="../assets/logo.svg" alt="">
          <div>OJ平台 | {{ title }}</div>
        </a-space>
      </a-layout-header>
      <a-layout-content class="content">
        <template v-if="router.path=='/user/login'">
          <UserLoginView></UserLoginView>
        </template>
        <template v-else>
          <UseRegisterView></UseRegisterView>
        </template>
      </a-layout-content>
      <a-layout-footer class="footer"><a href="https://kuikui.space" target="_blank">猿分享 by 魁魁</a></a-layout-footer>
    </a-layout>
  </div>
</template>

<script setup lang='ts'>
import UserLoginView from '@/views/user/UserLoginView.vue'
import UseRegisterView from '@/views/user/UseRegisterView.vue'
import { computed } from 'vue';
import { useRoute } from 'vue-router';
const router = useRoute()
const title = computed(()=>{
  return router.path==='/user/register'?'注册':'登录'
})
</script>
<style scoped>
.header{
  text-align: center;
  margin-top: 30px;
}
.header img{
  width: 60px;
  height: 60px;

}
.Wapper{
  background: url(https://www.toptal.com/designers/subtlepatterns/uploads/restaurant.png);
  background-position: center;
}
.Wapper .content{
  padding: 20px;
}
.Wapper .footer{
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
  padding-bottom: 15px;
}
</style>
