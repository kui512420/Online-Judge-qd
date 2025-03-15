<template>

  <a-row class="golbalHeader" align="center" :wrap=false>
    <a-col flex="auto">
      <a-menu mode="horizontal" :default-selected-keys="['/']" @menu-item-click="toPathPage">
        <a-menu-item key="" :style="{ padding: 0, marginRight: '38px' }" disabled>
          <div class="logo-warpper">
            <img src="../assets/logo.svg" alt="">
            <div class="title">OJ 判题</div>
          </div>
        </a-menu-item>
        <a-menu-item v-for="(item) in showMenus" :key=item.path>
          {{ item.name }}
        </a-menu-item>
      </a-menu>
    </a-col>
    <a-switch v-model="useStore.theme">
      <template #checked-icon>
        <icon-moon-fill />
      </template>
      <template #unchecked-icon>
        <icon-sun-fill />
      </template>
    </a-switch>
    <a-col flex="80px">
      <div>
        <template v-if="useStore.user.name==''">
          <a-dropdown @select="handleSelect">
            <a-avatar>
              <img alt="avatar"
                src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp" />
            </a-avatar>
            <template #content>
              <a-doption>个人中心</a-doption>
              <a-doption>退出登录</a-doption>
            </template>
          </a-dropdown>

        </template>
        <template v-else>
          <a-button @click="goLoginPage">登录</a-button>
        </template>
      </div>
    </a-col>
  </a-row>

</template>

<script setup lang='ts'>
import routes from '@/router/routes';
import router from '@/router/index';
import { userStore } from '@/stores/user'
import cheakAccess from '@/access/cheakAccess';
import {IconSunFill,IconMoonFill} from '@arco-design/web-vue/es/icon';
import { computed } from 'vue';
// 可以在组件中的任意位置访问 `store` 变量 ✨
const useStore = userStore()
const goLoginPage = ()=>{
  router.replace('user/login')
}
const handleSelect = (event:string)=>{
  console.log(event)
}

const showMenus = computed(() => {
  return routes.filter((item) => {

    if (!cheakAccess(useStore.user, item?.meta?.access)) {
      return false
    }
    if (item.meta?.isHidden) {
      return false
    }
    return true
  })
})
useStore.Login()

const toPathPage = (key?: string) => {
  router.push({ path: key })
}
</script>
<style scoped>
.golbalHeader {
  box-shadow: #eee 1px 1px 5px;
}

.menu-demo {
  box-sizing: border-box;
  width: 100%;
  padding: 40px;
  background-color: var(--color-neutral-2);
}

.logo-warpper {
  display: flex;
}

.logo-warpper img {
  width: 30px;
}

.title {
  margin-left: 12px;
  color: #444;
}
</style>
