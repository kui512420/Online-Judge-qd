<template>
  <div class="leaderboard-container">
    <!-- 背景图片和文字区域 -->
    <div class="background-section">
      <img src="https://static.shiyanlou.com/algorithm-competition/1702369389670-算法赛背景2.png" alt="背景图片" />
      <div class="text-overlay">
        <h2>战魂重燃，战友召集！</h2>
        <p>创造属于你的编程传奇！</p>
      </div>
    </div>
    <!-- 排行榜表格 -->
    <h1 class="leaderboard-title">排行榜</h1>
    <a-table :data="leaderboardData" :columns="columns" :pagination="true">
      <template #cell="{ record, index, column }">
        <template v-if="column.dataIndex === 'rank'">
          <span class="rank-number">{{ index + 1 }}</span>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';


// 表格列配置
const columns = ref([
  {
    title: '排名',
    dataIndex: 'rank',
    width: 80,
  },
  {
    title: '账号',
    dataIndex: 'name',
    width: 150,
  },
  {
    title: '昵称',
    dataIndex: 'score',
    width: 100,
  },
  {
    title: '通过题数',
    dataIndex: 'time',
    width: 150,
  },
]);
// 模拟排行榜数据
const leaderboardData = ref([
  {
    name: 'user123',
    score: '小李飞刀',
    time: 20,
  },
  {
    name: 'user123',
    score: '小李飞刀',
    time: 20,
  },
  {
    name: 'user123',
    score: '小李飞刀',
    time: 20,
  },
  {
    name: 'user123',
    score: '小李飞刀',
    time: 20,
  },
  {
    name: 'user123',
    score: '小李飞刀',
    time: 20,
  },
  {
    name: 'user123',
    score: '小李飞刀',
    time: 20,
  },
  {
    name: 'user123',
    score: '小李飞刀',
    time: 20,
  },
  {
    name: 'user123',
    score: '小李飞刀',
    time: 20,
  },
  {
    name: 'user123',
    score: '小李飞刀',
    time: 20,
  },
  {
    name: 'user123',
    score: '小李飞刀',
    time: 20,
  },
  {
    name: 'user123',
    score: '小李飞刀',
    time: 20,
  },
  {
    name: 'abcdef',
    score: '独行侠',
    time: 18,
  },
  {
    name: 'testuser',
    score: '暗夜猎手',
    time: 15,
  },
  {
    name: 'guest001',
    score: '疾风剑豪',
    time: 12,
  },
]);
</script>

<style scoped>
.background-section {
  position: relative;
  margin-bottom: 20px;
}

.background-section img {
  width: 100%;
  height: auto;
  display: block;
}

.text-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
  padding: 20px;
  border-radius: 8px;
}

.text-overlay h2 {
  margin-bottom: 10px;
}

.leaderboard-title {
  text-align: center;
  margin-bottom: 20px;
}

.rank-number {
  font-weight: bold;
  color: #1677ff;
}

@media (max-width: 768px) {
  .text-overlay {
    font-size: 10px;
    /* 手机屏幕字体大小 */
  }
}
</style>
