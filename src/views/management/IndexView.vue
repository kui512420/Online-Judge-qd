<template>
  <div>
    <div class="top">
      <a-card :header-style="{ textAlign: 'center' }" :style="{ width: '360px', textAlign: 'center' }" title="用户数量">
        <a-statistic :value="50" :value-from="0" animation></a-statistic>
      </a-card>
      <a-card :header-style="{ textAlign: 'center' }" :style="{ width: '360px', textAlign: 'center' }" title="题库数量">
        <a-statistic :value="50" :value-from="0" animation></a-statistic>
      </a-card>
      <a-card :header-style="{ textAlign: 'center' }" :style="{ width: '360px', textAlign: 'center' }" title="日志数量">
        <a-statistic :value="50" :value-from="0" animation></a-statistic>
      </a-card>
    </div>
    <div style="display: flex; justify-content: space-around; margin-top: 10px;">
      <a-card style=" width: 360px" title="用户增长统计">
        <EchartsSmooth></EchartsSmooth>
      </a-card>

      <a-card style=" width: 360px" title="日常登录用户统计">
        <EchartsSmooth></EchartsSmooth>
      </a-card>
    </div>

  </div>
</template>

<script setup lang='ts'>
import EchartsSmooth from '@/components/echarts/EchartsSmooth.vue';
</script>
<style scoped>
.top {
  display: flex;
  justify-content: space-around;
}
</style>
