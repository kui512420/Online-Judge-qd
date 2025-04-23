<template>
  <management-layouts>
    <a-card title="竞赛管理" class="competition-table">
      <div class="table-header">
        <a-input-search v-model="searchValue" placeholder="搜索竞赛名称" style="width: 300px" />
        <a-button type="primary" @click="showModal('add')"> <icon-plus /> 新建竞赛 </a-button>
      </div>

      <a-table
        :columns="columns"
        :data="competitionList"
        :pagination="pagination"
        @page-change="handlePageChange"
      >
        <template #status="{ record }">
          <a-tag :color="statusColor[record.status]">
            {{ statusMap[record.status] }}
          </a-tag>
        </template>

        <template #operations="{ record }">
          <a-button type="text" @click="showModal('edit', record)"> <icon-edit /> 编辑 </a-button>
          <a-popconfirm content="确定删除该竞赛？" @ok="handleDelete(record.id)">
            <a-button type="text" status="danger"> <icon-delete /> 删除 </a-button>
          </a-popconfirm>
        </template>
      </a-table>
    </a-card>

    <!-- 新增/编辑弹窗 -->
    <a-modal
      v-model:visible="modalVisible"
      :title="modalTitle"
      @ok="handleSubmit"
      @cancel="resetForm"
    >
      <a-form :model="formData">
        <a-form-item label="竞赛名称">
          <a-input v-model="formData.name" />
        </a-form-item>
        <a-form-item label="开始时间">
          <a-date-picker v-model="formData.startTime" show-time />
        </a-form-item>
        <a-form-item label="结束时间">
          <a-date-picker v-model="formData.endTime" show-time />
        </a-form-item>
        <a-form-item label="竞赛状态">
          <a-select v-model="formData.status">
            <a-option v-for="item in statusOptions" :key="item.value" :value="item.value">
              {{ item.label }}
            </a-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </management-layouts>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { usePagination } from '@arco-design/web-vue/es/_utils'

const searchValue = ref('')
const modalVisible = ref(false)
const modalType = ref('add')

const formData = reactive({
  id: '',
  name: '',
  startTime: '',
  endTime: '',
  status: 0,
})

const statusMap = {
  0: '未开始',
  1: '进行中',
  2: '已结束',
}

const statusColor = {
  0: 'blue',
  1: 'green',
  2: 'gray',
}

const statusOptions = [
  { value: 0, label: '未开始' },
  { value: 1, label: '进行中' },
  { value: 2, label: '已结束' },
]

const columns = [
  { title: '竞赛名称', dataIndex: 'name' },
  { title: '创建人', dataIndex: 'creator' },
  { title: '开始时间', dataIndex: 'startTime' },
  { title: '结束时间', dataIndex: 'endTime' },
  { title: '状态', slotName: 'status' },
  { title: '操作', slotName: 'operations' },
]

const pagination = reactive({
  current: 1,
  pageSize: 10,
  total: 50,
  showPageSize: true,
})

const competitionList = ref([
  {
    id: '1',
    name: '算法竞赛第7场',
    creator: '管理员',
    startTime: '2024-04-01 09:00',
    endTime: '2024-04-01 12:00',
    status: 0,
  },
])

const showModal = (type: string, record?: any) => {
  modalType.value = type
  modalVisible.value = true
  if (type === 'edit' && record) {
    Object.assign(formData, record)
  }
}

const handleSubmit = () => {
  // 提交逻辑
  modalVisible.value = false
}

const resetForm = () => {
  Object.keys(formData).forEach((key) => {
    if (key !== 'id') formData[key] = ''
  })
}

const handlePageChange = (page: number) => {
  pagination.current = page
}

const handleDelete = (id: string) => {
  // 删除逻辑
}
</script>

<style scoped>
.table-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
</style>
