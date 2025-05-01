<template>
  <a-card>
    <div class="top">
      <a-card
        :header-style="{ textAlign: 'center' }"
        :style="{ width: '360px', textAlign: 'center' }"
        title="用户数量"
      >
        <a-statistic :value="50" :value-from="0" animation></a-statistic>
      </a-card>
      <a-card
        :header-style="{ textAlign: 'center' }"
        :style="{ width: '360px', textAlign: 'center' }"
        title="题库数量"
      >
        <a-statistic :value="50" :value-from="0" animation></a-statistic>
      </a-card>
      <a-card
        :header-style="{ textAlign: 'center' }"
        :style="{ width: '360px', textAlign: 'center' }"
        title="日志数量"
      >
        <a-statistic :value="50" :value-from="0" animation></a-statistic>
      </a-card>
    </div>
    <div style="display: flex; justify-content: space-around; margin-top: 10px">
      <a-card style="width: 360px" title="刷题数据统计">
        <EchartsPie></EchartsPie>
      </a-card>
    </div>
  </a-card>
</template>

<script setup lang="ts">
import EchartsPie from '@/components/echarts/EchartsPie.vue'
</script>
<style scoped>
.top {
  display: flex;
  justify-content: space-around;
}
</style>
