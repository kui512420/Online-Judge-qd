<template>
  <a-layout class="layout-demo">
    <a-layout-sider hide-trigger collapsible :collapsed="collapsed">
      <div class="logo" @click="router.push('/')">
        <div v-if="!collapsed" style="padding-left: 20px; padding-top: 10px; text-align: center">
          KUIKUI OJ
        </div>
      </div>
      <a-menu
        :defaultOpenKeys="['0_1']"
        :defaultSelectedKeys="[activeKey]"
        :style="{ width: '100%' }"
        @menuItemClick="handleMenuItemClick"
      >
        <a-menu-item key="0_1" @click="addTab('首页', '/management/index')">
          <IconHome />
          首页
        </a-menu-item>

        <a-menu-item key="0_2" @click="addTab('用户管理', '/management/user')">
          <icon-user />
          用户管理
        </a-menu-item>

        <a-sub-menu key="0_3">
          <template #title>
            <icon-code />
            题目管理
          </template>
          <a-menu-item key="0_3_1" @click="addTab('题目列表', '/management/question')">
            题目列表
          </a-menu-item>
          <a-menu-item key="0_3_2" @click="addTab('添加题目', '/management/question/put')">
            添加题目
          </a-menu-item>
        </a-sub-menu>

        <a-menu-item key="0_4" @click="addTab('提交记录管理', '/management/questionSubmit')">
          <icon-user />
          提交记录管理
        </a-menu-item>

        <a-menu-item key="0_5" @click="addTab('竞赛管理', '/management/competition')">
          <icon-trophy />
          竞赛管理
        </a-menu-item>
        <a-menu-item key="0_6" @click="addTab('日志管理', '/management/loginLog')">
          <IconCalendar />
          日志管理
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="padding-left: 20px" class="header">
        <a-button shape="round" @click="onCollapse">
          <IconCaretRight v-if="collapsed" />
          <IconCaretLeft v-else />
        </a-button>
        <div style="display: flex">
          <ThemeSwitch></ThemeSwitch>
          <MyHeader style="margin-left: 10px"></MyHeader>
        </div>
      </a-layout-header>
      <a-layout style="padding: 0 24px; margin-top: 20px">
        <a-layout-header>
          <a-breadcrumb :style="{ marginBottom: '20px' }">
            <a-breadcrumb-item v-for="(item, index) in breadcrumbList" :key="index">
              {{ item }}
            </a-breadcrumb-item>
          </a-breadcrumb>
          <a-tabs
            type="card-gutter"
            :editable="true"
            :show-add-button="false"
            @delete="handleDelete"
            show-add-button
            v-model:active-key="activeKey"
            @change="handleTabChange"
          >
            <a-tab-pane
              style="background-color: #fff"
              v-for="item of tabs"
              :key="item.key"
              :title="item.title"
              :closable="item.key !== '0_1'"
            >
              <router-view></router-view>
            </a-tab-pane>
          </a-tabs>
        </a-layout-header>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  IconHome,
  IconUser,
  IconCaretRight,
  IconCaretLeft,
  IconCode,
  IconTrophy,
  IconCalendar,
} from '@arco-design/web-vue/es/icon'
import ThemeSwitch from '@/components/ThemeSwitch.vue'
import MyHeader from '@/components/MyHeader.vue'
import { useIndexStore } from '@/stores/indexStore'

const router = useRouter()
const route = useRoute()
const collapsed = ref(false)
const activeKey = ref('0_1')
const tabs = ref(useIndexStore().tabs)

const breadcrumbList = computed(() => {
  const matched = route.matched
  return matched.map((item) => item.meta?.title || item.name)
})
// 添加标签页切换处理函数
const handleTabChange = (key: string) => {
  const tab = tabs.value.find((t) => t.key === key)
  if (tab) {
    router.push(tab.path)
  }
}

const onCollapse = () => {
  collapsed.value = !collapsed.value
}

// 添加标签页
const addTab = (title: string, path: string, key?: string) => {
  const tabKey = key || path // 使用path作为key或自定义key

  // 如果标签页已存在，则激活它
  const existingTab = tabs.value.find((tab) => tab.key === tabKey)
  if (existingTab) {
    activeKey.value = tabKey
    router.push(path)
    return
  }

  // 添加新标签页
  tabs.value.push({
    key: tabKey,
    title,
    path,
  })

  // 激活新标签页
  activeKey.value = tabKey
  router.push(path)
}

// 处理菜单项点击
const handleMenuItemClick = (key: string) => {
  activeKey.value = key
}

// 处理删除标签页
const handleDelete = (key: string) => {
  const index = tabs.value.findIndex((tab) => tab.key === key)
  if (index !== -1) {
    tabs.value.splice(index, 1)

    // 如果删除的是当前激活的标签页，则激活前一个标签页
    if (activeKey.value === key) {
      activeKey.value = tabs.value[Math.max(0, index - 1)]?.key || ''
      if (tabs.value.length > 0) {
        router.push(tabs.value.find((tab) => tab.key === activeKey.value)?.path || '/')
      }
    }
  }
}

// 监听路由变化，确保标签页同步
watch(
  () => route.path,
  (newPath) => {
    const tab = tabs.value.find((t) => t.path === newPath)
    if (tab) {
      activeKey.value = tab.key
    }
  },
  { immediate: true },
)
</script>

<style scoped>
/* 保留原有样式 */
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
  background: url('../assets/logo.png');
  background-size: contain;
  background-repeat: no-repeat;
  cursor: pointer;
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

@media (max-width: 768px) {
  .layout-demo {
    flex-direction: column;
  }

  .layout-demo :deep(.arco-layout-sider) {
    width: 100% !important;
    max-width: 100% !important;
  }

  .header {
    padding: 5px;
  }

  .layout-demo :deep(.arco-menu) {
    width: 100%;
  }

  .layout-demo :deep(.arco-layout-content) {
    padding: 10px;
  }
}
</style>
