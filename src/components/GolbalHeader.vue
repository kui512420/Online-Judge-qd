<template>

  <a-row class="golbalHeader" align="center" :wrap=false>
    <a-col flex="auto">
      <a-menu mode="horizontal" :selected-keys="[route.path]" @menu-item-click="toPathPage">
        <a-menu-item key="" :style="{ padding: 0, marginRight: '38px' }" disabled>
          <div class="logo-warpper">
            <img src="../assets/logo.png" alt="">
            <div class="title">KUIKUI OJ</div>
          </div>
        </a-menu-item>
        <a-menu-item v-for="(item) in showMenus" :key=item.path>
          {{ item.name }}
        </a-menu-item>

      </a-menu>
    </a-col>
    <div style="background-color: #fff; display: flex; height: 100%; align-items: center; justify-content: center;">
      <ThemeSwitch></ThemeSwitch>
    <a-col flex="80px">
      <MyHeader style="margin-left: 10px;"></MyHeader>
    </a-col>
    </div>
  </a-row>

</template>

<script setup lang='ts'>
import routes from '@/router/routes';
import router from '@/router/index';
import { useUserStore } from '@/stores/userStore'
import cheakAccess from '@/access/cheakAccess';
import ThemeSwitch from './ThemeSwitch.vue';
import MyHeader from './MyHeader.vue';
import { computed } from 'vue';

const useStore = useUserStore()
import { useRoute } from 'vue-router';
const route = useRoute();


const showMenus = computed(() => {
  return routes.filter((item) => {

    if (!cheakAccess(useStore.user, item?.meta?.access)) {
      return false
    }
    if (item.meta?.isHidden) {
      return false
    }
    return true
  })
})

const toPathPage = (key: string) => {
  router.push({ path: key })
}
</script>
<style scoped>
.golbalHeader {
  background-color: inherit;
  box-shadow: #eee 1px 1px 5px;
}

@media (max-width: 768px) {
  .title {
    display: none;
  }
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
