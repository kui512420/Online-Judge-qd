<template>
<div>
  <a-switch v-model="useStore.theme">
      <template #checked-icon>
        <icon-moon-fill />
      </template>
      <template #unchecked-icon>
        <icon-sun-fill />
      </template>
    </a-switch>
</div>
</template>

<script setup lang='ts'>
import { IconSunFill, IconMoonFill } from '@arco-design/web-vue/es/icon';
import { useUserStore } from '@/stores/userStore'
const useStore = useUserStore()
</script>
<style scoped>
</style>
