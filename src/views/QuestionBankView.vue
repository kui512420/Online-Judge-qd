<template>
  <div>
    <a-table :data="data">
      <template #columns>
        <a-table-column title="题目ID" data-index="id"></a-table-column>
        <a-table-column title="题目" data-index="name"></a-table-column>
        <a-table-column title="标签" data-index="tags">
          <template #cell="{ record }">
            <a-tag color="orangered" v-for="(item, index) in record.tags" :key="index" bordered>{{ item }}</a-tag>
          </template>
        </a-table-column>
        <a-table-column title="通过率" data-index="completionRate"></a-table-column>
        <a-table-column title="挑战人数" data-index="challengeCount"></a-table-column>
        <a-table-column title="操作" data-index="options">
          <template #cell="{ record }">
            <a-button @click="handleDo(record.id)">开始挑战</a-button>
          </template>
        </a-table-column>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import router from '@/router';
import { reactive } from 'vue';

// 模拟生成数据
const data = reactive([
  {
    id: 1,
    name: "两数之和",
    tags: ["数组", "哈希表"],
    completionRate: "80%",
    challengeCount: 120
  },
  {
    id: 2,
    name: "有效的括号",
    tags: ["栈", "字符串"],
    completionRate: "60%",
    challengeCount: 80
  },
  {
    id: 3,
    name: "合并两个有序链表",
    tags: ["链表"],
    completionRate: "75%",
    challengeCount: 90
  },
  {
    id: 4,
    name: "二叉树的中序遍历",
    tags: ["二叉树", "栈"],
    completionRate: "50%",
    challengeCount: 60
  },
  {
    id: 5,
    name: "买卖股票的最佳时机",
    tags: ["数组", "动态规划"],
    completionRate: "70%",
    challengeCount: 100
  },
]);

// 模拟编辑操作
const handleDo = (id: number) => {
  router.push("/questionView/" + id)
};


</script>

<style scoped></style>
