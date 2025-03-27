<template>
  <div>
    <div style="display: flex; align-items: center; margin-bottom: 10px;">
      <a-select :style="{ width: '120px' }" placeholder="查询条件">
        <a-option>ID</a-option>
        <a-option>账号</a-option>
        <a-option>邮箱</a-option>
      </a-select>
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
    <a-table :columns="columns" :data="dataSource" :column-resizable="true" :pagination="false" :row-selection="rowSelection"
      v-model:selectedKeys="selectedKeys">
      <template #userAvatar="{ record }">
        <a-image width="70" :src=record.userAvatar style="border-radius: 50%;"></a-image>
      </template>
      <template #options="{ record }">
        <!-- 新增操作按钮 -->
        <div style="display: flex;">
          <a-button size="small">编辑</a-button>
          <a-button size="small">删除</a-button>
        </div>
      </template>
    </a-table>

    <a-pagination style="justify-content: center; margin-top: 10px;" :total=pagination.total show-total show-jumper
      show-page-size />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import {  IconDownload } from '@arco-design/web-vue/es/icon';
import { UserControllerService } from '@/generated';
const rowSelection = reactive({
  type: 'checkbox',
  showCheckedAll: true,
  onlyCurrent: false,
});
const pagination = reactive({
  total:0
})
const selectedKeys = ref([])
const columns = ref([
  {
    title: 'id',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '账号',
    dataIndex: 'userAccount',
    key: 'userAccount',
  },
  {
    title: '头像',
    dataIndex: 'userAvatar',
    key: 'userAvatar',
    slotName: 'userAvatar',
  },
  {
    title: '昵称',
    dataIndex: 'userName',
    key: 'userName',
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: '角色',
    dataIndex: 'userRole',
    key: 'userRole',
  },
  {
    title: '注册时间',
    dataIndex: 'createTime',
    key: 'createTime',
  },
  {
    title: '最后一次登录时间',
    dataIndex: 'updateTime',
    key: 'updateTime',
  },
  {
    title: '操作',
    slotName: 'options'
  },
]);

const dataSource = ref([]);
const userList = ()=>{
  UserControllerService.getUserListUsingGet(1,10,0).then((res)=>{
    console.log(res)
    if(res.code==200){
      dataSource.value = res.data?.list

      pagination.total = res.data?.total??0
    }
  })
}
userList()
const searchTitle = ref('搜索条件')
const handleSelect = (event: string) => {
  searchTitle.value = event
}
</script>
