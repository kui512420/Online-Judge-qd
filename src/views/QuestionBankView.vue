<template>
  <div>
    <a-table :data="data">
      <template #columns>
        <a-table-column title="题目ID" data-index="id"></a-table-column>
        <a-table-column title="题目" data-index="title"></a-table-column>
        <a-table-column title="标签" data-index="tags">
          <template #cell="{ record }">
            <a-tag color="orangered" v-for="(item, index) in JSON.parse(record.tags)" :key="index" bordered>{{ item }}</a-tag>
          </template>
        </a-table-column>
        <a-table-column title="通过率" data-index="completionRate">
          <template #cell="{ record }">
            <a-progress :percent=record.acceptedNum/record.submitNum :style="{width:'50%'}" />
          </template>
        </a-table-column>
        <a-table-column title="挑战人数" data-index="submitNum"></a-table-column>
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
import {  ref } from 'vue';
import { QuestionControllerService } from '@/generated';
// 封装 Question 类型
interface QuestionListVo {
  id: bigint;
  name: string;
  tags: string[];
  completionRate: number;
  submitNum: number;
}
const data = ref<QuestionListVo[]>([]);
const getList = ()=>{
  QuestionControllerService.questionsUsingGet(1,10).then((res)=>{
    data.value = res.data?.list
  })
}
getList()
// 模拟编辑操作
const handleDo = (id: number) => {
  router.push("/questionView/" + id)
};
</script>

<style scoped></style>
