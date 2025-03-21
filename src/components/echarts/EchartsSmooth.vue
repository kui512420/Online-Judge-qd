<template>
  <div ref="chartDom" class="wappers">
  </div>
</template>

<script setup lang='ts'>
import { onMounted, ref } from 'vue';
import * as echarts from 'echarts';

const chartDom = ref()
onMounted(() => {
  const myChart = echarts.init(chartDom.value)
  const option = ref({
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [10, 5, 4, 1, 3, 10, 12],
        type: 'line',
        smooth: true
      },

    ]
  })
  myChart.setOption(option.value)
})
</script>
<style scoped>
.wappers {
  width: 100%;
  height: 300px;
}
</style>
