<template>
  <div>
    <a-card class="custom-card">
      <div class="card-content">
        <div>
          <h3>第7场算法赛</h3>
          <div>发布人：魁魁</div>
          <div>比赛时间：04月05日 19:00-21:00</div>
        </div>

        <div class="card-content-right">
          <div class="card-content-right-icon">
            <icon-share-internal />
            分享
          </div>
          <a-button type="primary" shape="round" @click="goToCompetitionInfo">立即报名</a-button>
        </div>
      </div>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { IconShareInternal } from '@arco-design/web-vue/es/icon'
import { useRouter } from 'vue-router'

const router = useRouter()

const goToCompetitionInfo = () => {
  router.push('/competitionInfo/7')
}
</script>

<style scoped>
.custom-card {
  transition: all 0.3s ease;
}
.card-content-right-icon {
  margin-right: 5px;
  cursor: pointer;
}
.card-content-right-icon:hover {
  color: aqua;
}
.card-content-right {
  display: flex;
  align-items: center;
}
.card-content {
  display: flex;
  justify-content: space-between;
}
.custom-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transform: translateY(-20px);
}
</style>
