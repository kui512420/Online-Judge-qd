<template>
  <a-card>
    <a-table
      :columns="columns"
      :data="dataSource"
      :pagination="{
        showTotal: true,
        pageSize: pageSize,
        current: current,
        total: total,
      }"
      @page-change="onPageChange"
    >
      <template #userAccount="{ record }">
        {{ record.userAccount }}
      </template>
      <template #loginTime="{ record }">
        {{ formatTime(record.loginTime) }}
      </template>
      <template #ipAddress="{ record }">
        {{ record.ipAddress }}
      </template>
      <template #userAgent="{ record }">
        {{ record.userAgent }}
      </template>
    </a-table>
  </a-card>
</template>

<script setup>
import { ref } from 'vue'

const columns = [
  {
    title: '用户账号',
    dataIndex: 'userAccount',
    key: 'userAccount',
    slotName: 'userAccount',
  },
  {
    title: '登录时间',
    dataIndex: 'loginTime',
    key: 'loginTime',
    slotName: 'loginTime',
  },
  {
    title: 'IP地址',
    dataIndex: 'ipAddress',
    key: 'ipAddress',
    slotName: 'ipAddress',
  },
  {
    title: '用户代理',
    dataIndex: 'userAgent',
    key: 'userAgent',
    slotName: 'userAgent',
  },
]

const dataSource = ref([])
const pageSize = ref(10)
const current = ref(1)
const total = ref(0)

const onPageChange = (page) => {
  current.value = page
  getLoginLogList()
}

const getLoginLogList = () => {
  // TODO: 调用接口获取登录日志数据
}

getLoginLogList()
</script>
