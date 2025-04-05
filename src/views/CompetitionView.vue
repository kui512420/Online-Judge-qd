<template>
  <div class="wapper">
    <div class="item-bigImg">
      <div class="item-bigImg-txt">
        <div><h1>kuikui·算法赛</h1></div>
        <div>战魂重燃，战友召集！创造属于你的编程传奇！</div>
      </div>
    </div>
    <div class="item-content">
      <a-menu :style="{ width: '200px', borderRadius: '4px' }" :default-selected-keys="['1']">
        <a-menu-item key="1">
          <template #icon><icon-apps></icon-apps></template>
          全部竞赛
        </a-menu-item>
        <a-menu-item key="2">
          <template #icon><icon-apps></icon-apps></template>
          报名中
        </a-menu-item>
        <a-menu-item key="3">
          <template #icon><icon-apps></icon-apps></template>
          进行中
        </a-menu-item>
        <a-menu-item key="4">
          <template #icon><icon-apps></icon-apps></template>
          已结束中
        </a-menu-item>
      </a-menu>
      <div class="item">
        <CompetitionCardVue></CompetitionCardVue>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import CompetitionCardVue from '../components/CompetitionCard.vue'
</script>
<style scoped>
.item-bigImg-txt{
    margin: 0 auto;
    padding-top: 30px;
}
.wapper {
  margin: 0 auto;
}
.item-content {
  display: flex;
  flex-direction: row;
}
.item {
    margin-top: 50px;
  flex-grow: 3;
}
.item-bigImg {
  width: 100%;
  text-align: center;
  color: aliceblue;
  margin: 0 auto;
  height: 150px;
  background: url('https://static.shiyanlou.com/algorithm-competition/1702369389670-算法赛背景2.png');
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
