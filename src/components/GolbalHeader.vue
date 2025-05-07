<template>
  <a-row class="golbalHeader" align="center" :wrap="false">
    <a-col flex="auto">
      <a-menu mode="horizontal" :selected-keys="[route.path]" @menu-item-click="toPathPage">
        <a-menu-item key="" :style="{ padding: 0, marginRight: '38px' }" @click="router.push('/')">
          <div class="logo-warpper" style="cursor: pointer">
            <img src="../assets/logo.png" alt="" />
            <div class="title">KUIKUI OJ</div>
          </div>
        </a-menu-item>
        <a-menu-item v-for="item in showMenus" :key="item.path">
          {{ item.name }}
        </a-menu-item>
      </a-menu>
    </a-col>
    <div class="header-right">
      <ThemeSwitch></ThemeSwitch>
      <MyHeader style="margin: 0 20px"></MyHeader>
    </div>
  </a-row>
</template>

<script setup lang="ts">
import routes from '@/router/routes'
import router from '@/router/index'
import { useUserStore } from '@/stores/userStore'
import cheakAccess from '@/access/cheakAccess'
import ThemeSwitch from './ThemeSwitch.vue'
import MyHeader from './MyHeader.vue'
import { computed } from 'vue'

const useStore = useUserStore()
import { useRoute } from 'vue-router'
const route = useRoute()

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

const toPathPage = (key: string) => {
  router.push({ path: key })
}
</script>
<style scoped>
.golbalHeader {
  background-color: inherit;
  box-shadow: #eee 1px 1px 5px;
}

.header-right {
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  background-color: var(--color-background);
  transition: background-color 0.3s ease;
}

@media (max-width: 768px) {
  .title {
    display: none;
  }
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
  color: var(--color-text);
  font-weight: bold;
  transition: color 0.3s ease;
}

/* 深色模式下的标题样式 */
:root.dark .title {
  color: #ffffff;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
}
</style>
