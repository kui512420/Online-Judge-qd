<template>
  <div>
    <!-- 使用 v-if 进行条件判断 -->
    <div v-if="props.list=== undefined">
      没提交数据
    </div>
    <div v-else>
      <a-card v-for="(item, index) in props.list.records" :key="index">
        {{ item.createTime }} 1625kb 200ms JAVA 0%
      </a-card>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps(['list'])
</script>

<style scoped>
</style>
