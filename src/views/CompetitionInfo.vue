<template>
  <div class="wapper">
    <a-breadcrumb>
      <template #separator>
        <icon-right />
      </template>
      <a-breadcrumb-item>Home</a-breadcrumb-item>
      <a-breadcrumb-item>Channel</a-breadcrumb-item>
      <a-breadcrumb-item>News</a-breadcrumb-item>
    </a-breadcrumb>

    <a-card>
      <div>
        <h3>第 28 场 蓝桥月赛</h3>
        <p>
          本场比赛为「蓝桥·算法双周赛」第二十八场蓝桥月赛，赛题共计 6 题，比赛时间为 2025 年 04 月
          19 日（星期六），下午 19:00 ~ 21:00，共 2 小时。参赛奖励最高200元。
        </p>
        <a-button type="primary" shape="round">已报名</a-button>
        已有1814人参加
        <p>距开赛还有 11天03小时53分钟</p>
      </div>
    </a-card>
    <div>
      <a-tabs default-active-key="2">
        <a-tab-pane key="1" title="题目列表">
          <template #title>题目列表</template>
          题目列表
        </a-tab-pane>
        <a-tab-pane key="2" title="排行榜">
          <template #title>排行榜</template>
          排行榜
        </a-tab-pane>
        <a-tab-pane key="3">
          <template #title>比赛评论</template>
          比赛评论
        </a-tab-pane>
        <a-tab-pane key="4">
          <template #title>比赛详情</template>
          比赛详情
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IconRight } from '@arco-design/web-vue/es/icon'
</script>

<style scoped>
.wapper {
  width: 80vh;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .wapper {
    width: 100%;
    padding: 0 10px;
  }

  .a-card {
    width: 100% !important;
    margin-bottom: 10px;
  }

  h3 {
    font-size: 18px;
  }

  p {
    font-size: 14px;
  }
}
</style>
