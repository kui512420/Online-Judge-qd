<template>
  <div class="Wapper">
    <a-layout style="min-height: 100vh;">
      <a-layout-header class="header">
        <GolbalHeader></GolbalHeader>
      </a-layout-header>
      <a-layout-content class="content">
        <router-view></router-view>
      </a-layout-content>
      <a-layout-footer class="footer"><a href="https://kuikui.space" target="_blank">猿分享 by 魁魁</a></a-layout-footer>
    </a-layout>
  </div>
</template>

<script setup lang='ts'>
import GolbalHeader from '@/components/GolbalHeader.vue'

</script>
<style scoped>

.Wapper .content{
  padding: 20px;
  background:linear-gradient(to right,red,blue)
}
.Wapper .footer{
  background-color: gray;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
}
</style>
