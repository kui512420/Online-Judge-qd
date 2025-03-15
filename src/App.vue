<script setup lang="ts">
import BasicLayouts from '@/layouts/BasicLayouts.vue'
import UserLayouts from '@/layouts/UserLayouts.vue'
import { useRoute } from 'vue-router';
import { userStore } from '@/stores/user'
import { watch } from 'vue';
const router = useRoute()
const useStore = userStore()
watch(()=>useStore.theme,()=>{
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
},{deep:true})
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
