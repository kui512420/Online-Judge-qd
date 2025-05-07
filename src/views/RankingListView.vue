<template>
  <div class="ranking-container">
    <a-card class="ranking-card">
      <template #title>
        <div class="card-title">
          <span>用户排行榜</span>
          <a-space>
            <a-select v-model="sortBy" style="width: 120px" placeholder="排序方式">
              <a-option value="solved">解题数量</a-option>
              <a-option value="rate">通过率</a-option>
            </a-select>
            <span style="font-size: 12px; color: #666">数据每30分钟更新</span>
          </a-space>
        </div>
      </template>
      <a-table :data="rankingData" :pagination="pagination" @page-change="onPageChange">
        <template #columns>
          <a-table-column title="排名" align="center">
            <template #cell="{ rowIndex }">
              {{ (pagination.current - 1) * pagination.pageSize + rowIndex + 1 }}
            </template>
          </a-table-column>
          <a-table-column title="用户" align="center">
            <template #cell="{ record }">
              <a-space>
                <a-avatar :size="32" :image-url="record.avatarUrl || '/default.png'" />
                {{ record.username }}
              </a-space>
            </template>
          </a-table-column>
          <a-table-column title="解题数量" data-index="solvedCount" align="center" sortable />
          <a-table-column title="提交数量" data-index="submissionCount" align="center" />
          <a-table-column title="通过率" align="center">
            <template #cell="{ record }">
              {{ (record.solvedCount / record.submissionCount) * 100 }}%
            </template>
          </a-table-column>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const sortBy = ref('solved')
const rankingData = ref([
  { username: '用户1', solvedCount: 100, submissionCount: 150, avatarUrl: '' },
  { username: '用户2', solvedCount: 90, submissionCount: 120, avatarUrl: '' },
  { username: '用户3', solvedCount: 85, submissionCount: 100, avatarUrl: '' },
])

const pagination = ref({
  current: 1,
  pageSize: 10,
  total: 100,
})

const onPageChange = (current: number) => {
  pagination.value.current = current
  // 这里可以添加获取新页面数据的逻辑
}

onMounted(() => {
  // 这里可以添加初始化数据获取的逻辑
})
</script>

<style scoped>
.ranking-container {
  padding: 20px;
}

.ranking-card {
  background: var(--color-bg-2);
  border-radius: 4px;
}

.card-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
