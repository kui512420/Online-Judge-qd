<script setup lang="ts">
import BasicLayouts from '@/layouts/BasicLayouts.vue'
import UserLayouts from '@/layouts/UserLayouts.vue'
import { useRoute } from 'vue-router';
const router = useRoute()
</script>

<template>
  <div id="app">
    <template v-if="router.path.startsWith('/user')">
      <UserLayouts></UserLayouts>
    </template>
    <template v-else>
      <BasicLayouts></BasicLayouts>
    </template>
  </div>
</template>
<style scoped>
#app {}
</style>
