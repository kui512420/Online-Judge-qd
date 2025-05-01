<template>
  <div>
    <div v-if="!props.list || props.list.length === 0" class="no-data">暂无提交记录</div>
    <div v-else>
      <a-card v-for="(item, index) in props.list" :key="index" class="submit-card">
        <div class="submit-info">
          <span class="time">提交时间：{{ new Date(item.createTime).toLocaleString() }}</span>
          <span class="language">语言：{{ item.language }}</span>
          <span :class="['status', getStatusClass(item.status)]">
            状态：{{ getStatusText(item.status) }}
          </span>
          <span class="memory" v-if="item.memory">内存：{{ item.memory }}KB</span>
          <span class="time-cost" v-if="item.time">耗时：{{ item.time }}MS</span>
        </div>
      </a-card>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps(['list'])

const getStatusClass = (status: number) => {
  switch (status) {
    case 0:
      return 'waiting'
    case 1:
      return 'running'
    case 2:
      return 'success'
    case 3:
      return 'failed'
    default:
      return ''
  }
}

const getStatusText = (status: number) => {
  switch (status) {
    case 0:
      return '待判题'
    case 1:
      return '判题中'
    case 2:
      return '成功'
    case 3:
      return '失败'
    default:
      return '未知'
  }
}
</script>

<style scoped>
.no-data {
  text-align: center;
  padding: 20px;
  color: #666;
}

.submit-card {
  margin-bottom: 10px;
}

.submit-info {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.status {
  font-weight: bold;
}

.status.waiting {
  color: #808080;
}

.status.running {
  color: #2196f3;
}

.status.success {
  color: #4caf50;
}

.status.failed {
  color: #f44336;
}
</style>
