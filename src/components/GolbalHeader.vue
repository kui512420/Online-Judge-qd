<template>
  <a-row class="golbalHeader"  align="center" :wrap=false>
    <a-col flex="auto" >
      <a-menu mode="horizontal" :default-selected-keys="['/']" @menu-item-click="toPathPage">
        <a-menu-item key="" :style="{ padding: 0, marginRight: '38px' }" disabled>
          <div class="logo-warpper">
            <img src="../assets/logo.svg" alt="">
            <div class="title">OJ 判题</div>
          </div>
        </a-menu-item>
        <a-menu-item v-for="(item) in routes" :key=item.path >
          {{ item.name }}
        </a-menu-item>

      </a-menu>
    </a-col>
    <a-col flex="100px">
      <div>{{ useStore.userType.status }}</div>
    </a-col>
  </a-row>

</template>

<script setup lang='ts'>
import routes from '@/router/routes';
import { useRouter } from 'vue-router';
import { userStore } from '@/stores/counter'
// 可以在组件中的任意位置访问 `store` 变量 ✨
const useStore = userStore()

const router = useRouter();
const toPathPage = (key: string) => {
  router.push({ path: key })
}
</script>
<style scoped>
.golbalHeader{
  box-shadow: #eee 1px 1px 5px;
}
.menu-demo {
  box-sizing: border-box;
  width: 100%;
  padding: 40px;
  background-color: var(--color-neutral-2);
}

.logo-warpper {
  display: flex;
}

.logo-warpper img {
  width: 30px;
}

.title {
  margin-left: 12px;
  color: #444;
}
</style>
