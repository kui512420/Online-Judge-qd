<template>
  <div>
    <div style="display: flex; align-items: center; margin-bottom: 10px;">
      <a-dropdown @select="handleSelect" :popup-max-height="false">
        <a-button v-model="searchTitle">{{ searchTitle }} <icon-down /></a-button>
        <template #content>
          <a-doption>ID</a-doption>
          <a-doption>账号</a-doption>
          <a-doption>邮箱</a-doption>
        </template>
      </a-dropdown>
      <a-input-search :style="{ width: '320px' }" placeholder="请输入数据" search-button />
      <a-button status="warning">
        <template #icon>
          <icon-download></icon-download>
        </template>
        导出
      </a-button>

      <a-button type="primary" status="danger">
        批量删除
      </a-button>

      <a-button type="dashed">
        重置
      </a-button>
    </div>
    <a-table :columns="columns" :data="dataSource" :pagination="false" :row-selection="rowSelection"
      v-model:selectedKeys="selectedKeys">
      <template #avatar="{ record }">
        <a-image width="70" :src=record.avatar style="border-radius: 50%;"></a-image>
      </template>
      <template #options="{ record }">
        <!-- 新增操作按钮 -->
        <div style="display: flex;">
          <a-button size="small">编辑</a-button>
          <a-button size="small">删除</a-button>
        </div>
      </template>
    </a-table>

    <a-pagination style="justify-content: center; margin-top: 10px;" :total="50" show-total show-jumper
      show-page-size />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { IconDown, IconDownload } from '@arco-design/web-vue/es/icon';
const rowSelection = reactive({
  type: 'checkbox',
  showCheckedAll: true,
  onlyCurrent: false,
});
const selectedKeys = ref([])
const columns = ref([
  {
    title: 'id',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '账号',
    dataIndex: 'account',
    key: 'account',
  },
  {
    title: '头像',
    dataIndex: 'avatar',
    key: 'avatar',
    slotName: 'avatar',
  },
  {
    title: '昵称',
    dataIndex: 'nickname',
    key: 'nickname',
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: '角色',
    dataIndex: 'role',
    key: 'role',
  },
  {
    title: '概括',
    dataIndex: 'summary',
    key: 'summary',
  },
  {
    title: '注册时间',
    dataIndex: 'registerTime',
    key: 'registerTime',
  },
  {
    title: '最后一次登录时间',
    dataIndex: 'lastLoginTime',
    key: 'lastLoginTime',
  },
  {
    title: '操作',
    slotName: 'options'
  },
]);

const dataSource = ref([
  {
    id: 1,
    account: 'user1',
    // 确保图片链接有效
    avatar: 'http://127.0.0.1:5210/favicon.ico',
    nickname: '昵称1',
    email: 'user1@example.com',
    role: '普通用户',
    summary: '这是用户1的概括',
    registerTime: '2023-01-01 10:00:00',
    lastLoginTime: '2023-01-02 11:00:00',
  },
  {
    id: 2,
    account: 'user2',
    // 确保图片链接有效
    avatar: 'https://dummyimage.com/50x50/000/fff',
    nickname: '昵称2',
    email: 'user2@example.com',
    role: '管理员',
    summary: '这是用户2的概括',
    registerTime: '2023-02-01 11:00:00',
    lastLoginTime: '2023-02-02 12:00:00',
  },
]);
const searchTitle = ref('搜索条件')
const handleSelect = (event: string) => {
  searchTitle.value = event
}
</script>
