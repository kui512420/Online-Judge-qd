<template>
  <div class="wapper">
    <div class="content-left">
      <a-input placeholder="搜索题目编号或标题" allow-clear />
      <a-card style="margin: 20px 0;">
        <div class="filter">
          <div style="  padding: 10px;">排序</div>
          <div :class="{ 'filter-hover': true, 'filter-selected': isFilter1Selected }" class="filter-hover"
            @click="selectFilter(1)">
            <icon-arrow-rise />通过率最高
          </div>
          <div :class="{ 'filter-hover': true, 'filter-selected': isFilter2Selected }" class="filter-hover"
            @click="selectFilter(2)">
            <icon-arrow-fall />通过率最低
          </div>
        </div>
      </a-card>
      <a-table :data="data" :pagination="false">
        <template #columns>
          <a-table-column title="题目ID" data-index="id"></a-table-column>
          <a-table-column title="题目" data-index="title"></a-table-column>
          <a-table-column title="标签" data-index="tags">
            <template #cell="{ record }">
              <a-tag :color="getRandomColor()" v-for="(item, index) in JSON.parse(record.tags)" :key="index" bordered>{{
                item }}</a-tag>
            </template>
          </a-table-column>
          <a-table-column title="通过率" data-index="completionRate">
            <template #cell="{ record }">
              {{ ((record.acceptedNum / record.submitNum).toFixed(2)) }}
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
      <a-pagination style="justify-content: center; margin-top: 10px;" :total=total show-total show-jumper
      show-page-size />
    </div>
    <div class="content-right">
      <div :style="{ display: 'flex' }">
        <a-card :style="{ width: '360px' }" title="提交统计最近30天" class="hover-commit">
          <div class="commit">
            <div>
              <div><img width="30px" src="../assets/icon/提交成功.png" alt=""></div>
              <div style="padding: 5px; font-size: 20px;">1</div>
              <div>总提交</div>
            </div>
            <div>
              <div><img width="30px" src="../assets/icon/奖杯.png" alt=""></div>
              <div style="padding: 5px; font-size: 20px;">1</div>
              <div>通过数</div>
            </div>
            <div>
              <div><img width="30px" src="../assets/icon/折线图.png" alt=""></div>
              <div style="padding: 5px; font-size: 20px;">1</div>
              <div>通过率</div>
            </div>
          </div>
        </a-card>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import router from '@/router';
import { ref } from 'vue';
import { QuestionControllerService } from '@/generated';
import { IconArrowFall, IconArrowRise } from '@arco-design/web-vue/es/icon'
// 封装 Question 类型
interface QuestionListVo {
  id: bigint;
  name: string;
  tags: string[];
  completionRate: number;
  submitNum: number;
}
const data = ref<QuestionListVo[] | undefined>(undefined);
const total = ref(0)
// 用于跟踪第一个 div 是否被选中
const isFilter1Selected = ref(false);
// 用于跟踪第二个 div 是否被选中
const isFilter2Selected = ref(false);

const selectFilter = (filterIndex:number) => {
  // 重置所有的选中状态
  isFilter1Selected.value = false;
  isFilter2Selected.value = false;

  // 根据点击的索引设置对应的选中状态
  if (filterIndex === 1) {
    isFilter1Selected.value = true;
  } else if (filterIndex === 2) {
    isFilter2Selected.value = true;
  }
};
const getList = () => {
  QuestionControllerService.questionsUsingGet(1, 10).then((res) => {
    data.value = res.data!.records
    total.value = res.data!.total
  })
}
getList()
// 模拟编辑操作
const handleDo = (id: number) => {
  router.push("/questionView/" + id)
};

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};
</script>

<style scoped>
.commit {
  display: flex;
  justify-content: space-around;
  padding: 20px;
  height: 80%;
  text-align: center;
  border-radius: 10px;
  background-color: #f8f9fa;
}

.filter-hover {
  padding: 10px;
  cursor: pointer;
}

.filter-selected {
  color: #22bfa7;
  background: rgba(34, 191, 167, .1);
}

.filter-hover:hover {
  color: #22bfa7;
  background: rgba(34, 191, 167, .1);
}

.filter {
  display: flex;
  flex-direction: row;
  align-content: center;
}

.hover-commit:hover {
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
}

.wapper {
  display: flex;
  width: 100%;
  justify-content: space-around;
}

@media(max-width: 768px) {
  .wapper {
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: space-around;
  }

  .content-left {
    width: 100% !important;
  }

  .content-right {
    margin-top: 20px;
    width: 100% !important;
  }
}

.content-left {
  width: 50%;
}

.content-right {
  width: 30%;
}
</style>
