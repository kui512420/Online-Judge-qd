<template>
  <a-layout class="layout-demo">
    <a-layout-sider hide-trigger collapsible :collapsed="collapsed">
      <div class="logo" @click="router.push('/')">
        <div v-if="!collapsed" style="padding-left: 20px; padding-top: 10px; text-align: center; "> OJ 判题</div>
      </div>
      <a-menu :defaultOpenKeys="['0_1']" :defaultSelectedKeys="['0_1']" :style="{ width: '100%' }">

        <router-link to="/management/index">
          <a-menu-item key="0_1">
            <IconHome />
            首页
          </a-menu-item>
        </router-link>

        <router-link to="/management/user">
          <a-menu-item key="0_2">
            <IconCalendar />
            用户管理
          </a-menu-item>
        </router-link>
        <router-link to="/management/problem">
          <a-menu-item key="0_3">
            <IconCalendar />
            题目管理
          </a-menu-item>
        </router-link>
        <router-link to="/management/log">
          <a-menu-item key="0_4">
            <IconCalendar />
            日志管理
          </a-menu-item>
        </router-link>
        <router-link to="/management/contest">
          <a-menu-item key="0_5">
            <IconCalendar />
            竞赛管理
          </a-menu-item>
        </router-link>
      </a-menu>
    </a-layout-sider>
    <a-layout>

      <a-layout-header style="padding-left: 20px;" class="header">
        <a-button shape="round" @click="onCollapse">
          <IconCaretRight v-if="collapsed" />
          <IconCaretLeft v-else />
        </a-button>
        <div style="display: flex;">
          <ThemeSwitch></ThemeSwitch>
          <MyHeader style="margin-left: 10px;"></MyHeader>
        </div>
      </a-layout-header>
      <a-layout style="padding: 0 24px;">
        <a-breadcrumb :style="{ margin: '16px 0' }">
          <a-breadcrumb :style="{ margin: '16px 0' }">
            <a-breadcrumb-item v-for="(item, index) in breadcrumbItems" :key="index">{{ item }}</a-breadcrumb-item>
          </a-breadcrumb>
        </a-breadcrumb>
        <a-layout-content>
          <RouterView></RouterView>
        </a-layout-content>
        <a-layout-footer>Footer</a-layout-footer>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue';
import {
  IconCaretRight,
  IconCaretLeft,
  IconHome,
  IconCalendar,
} from '@arco-design/web-vue/es/icon';
import router from '@/router';
import ThemeSwitch from '@/components/ThemeSwitch.vue';
import MyHeader from '@/components/MyHeader.vue';

const collapsed = ref(false);
const breadcrumbItems = ref<string[]>([]);

// 路由映射表
const routeMap: Record<string, string> = {
  '/management/index': '首页',
  '/management/user': '用户管理',
  '/management/problem': '题目管理',
  '/management/log': '日志管理',
  '/management/contest': '竞赛管理'
};

// 监听路由变化
watch(() => router.currentRoute.value.path, (newPath) => {
  const paths = newPath.split('/').filter(Boolean);
  breadcrumbItems.value = paths.map((path, index) => {
    const fullPath = '/' + paths.slice(0, index + 1).join('/');
    return routeMap[fullPath] || path;
  });
}, { immediate: true });

const onCollapse = () => {
  collapsed.value = !collapsed.value;
};

</script>
<style scoped>
.layout-demo {
  height: 100vh;
  background: var(--color-fill-2);
  border: 1px solid var(--color-border);
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
}

.layout-demo :deep(.arco-layout-sider) .logo {
  height: 32px;
  margin: 12px 8px;
  background: url('../assets/logo.svg');
  background-repeat: no-repeat;
}

::-webkit-scrollbar {
  width: 0;
  height: 0;
}



.layout-demo :deep(.arco-layout-header) {
  height: 64px;
  line-height: 64px;
  background: var(--color-bg-3);
}

.layout-demo :deep(.arco-layout-footer) {
  height: 48px;
  color: var(--color-text-2);
  font-weight: 400;
  font-size: 14px;
  line-height: 48px;
}

.layout-demo :deep(.arco-layout-content) {
  color: var(--color-text-2);
  font-weight: 400;
  font-size: 14px;
  background: var(--color-bg-3);
  padding: 24px;
  min-height: calc(100vh - 64px - 48px - 32px);
  overflow: auto;
}

.layout-demo :deep(.arco-layout-footer) {
  height: 48px;
  color: var(--color-text-2);
  font-weight: 400;
  font-size: 14px;
  line-height: 48px;
  text-align: center;
  background: var(--color-bg-3);
}

.layout-demo :deep(.arco-layout-footer),
.layout-demo :deep(.arco-layout-content) {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  color: var(--color-text-2);
  font-size: 14px;
  text-align: left;
}
</style>
