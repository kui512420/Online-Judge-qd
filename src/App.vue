<script setup lang="ts">
import BasicLayouts from '@/layouts/BasicLayouts.vue'
import UserLayouts from '@/layouts/UserLayouts.vue'
import { useRoute } from 'vue-router';
import { useUserStore } from '@/stores/userStore'
import { watch } from 'vue';

const router = useRoute()
const useStore = useUserStore()
watch(() => useStore.theme, () => {
  if (useStore.theme) {
    document.body.setAttribute('arco-theme', 'dark');
    const appElement = document.getElementById('app');
    if (appElement) {
      appElement.style.backgroundColor = 'black';
    }
  } else {
    document.body.removeAttribute('arco-theme');
    const appElement = document.getElementById('app');
    if (appElement) {
      appElement.style.backgroundColor = '';
    }
  }
}, { deep: true })
</script>

<template>
  <div id="app">
    <template v-if="router.path.startsWith('/user')">
      <UserLayouts></UserLayouts>
    </template>
    <template v-else-if="router.path.startsWith('/management')">
      <router-view></router-view>
    </template>
    <template v-else>
      <BasicLayouts></BasicLayouts>
    </template>
  </div>
</template>
<style scoped>
#app {}
</style>
