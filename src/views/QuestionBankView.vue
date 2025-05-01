<template>
  <div class="wapper">
    <div class="content-left">
      <a-input placeholder="搜索题目编号或标题" allow-clear v-model="searchData" />
      <a-card style="margin: 20px 0">
        <div class="filter">
          <div style="padding: 10px">排序</div>
          <div
            :class="{ 'filter-hover': true, 'filter-selected': isFilter1Selected }"
            class="filter-hover"
            @click="selectFilter(1)"
          >
            <icon-arrow-rise />挑战人数
          </div>
          <div
            :class="{ 'filter-hover': true, 'filter-selected': isFilter2Selected }"
            class="filter-hover"
            @click="selectFilter(2)"
          >
            <icon-arrow-fall />挑战人数
          </div>
          <div class="filter-reset-hover" @click="reset">重置</div>
        </div>
      </a-card>
      <a-table :data="data" :pagination="false" row-key="id">
        <template #columns>
          <a-table-column title="题目ID" data-index="id" key="id" v-if="!isMobile"></a-table-column>
          <a-table-column title="题目" data-index="title" :width="100">
            <template #cell="{ record }">
              <div class="ellipsis-text">{{ record.title }}</div>
            </template>
          </a-table-column>
          <a-table-column title="标签" data-index="tags">
            <template #cell="{ record }">
              <a-tag
                :color="getRandomColor()"
                v-for="(item, index) in JSON.parse(record.tags)"
                :key="index"
                bordered
                >{{ item }}</a-tag
              >
            </template>
          </a-table-column>
          <a-table-column title="通过率">
            <template #cell="{ record }">
              {{ ((record.acceptedNum / record.submitNum) * 100).toFixed(2) }}%
            </template>
          </a-table-column>
          <a-table-column title="挑战人数" data-index="submitNum"></a-table-column>
          <a-table-column title="操作">
            <template #cell="{ record }">
              <a-button @click="handleDo(record.id)">开始挑战</a-button>
            </template>
          </a-table-column>
        </template>
      </a-table>
      <a-pagination
        style="justify-content: center; margin-top: 10px"
        v-model:page-size="pageSize"
        :page-size-options="pageSizes"
        @change="change"
        :total="pagination.total"
        show-total
        show-jumper
        show-page-size
      />
    </div>
    <div class="content-right">
      <div class="card-list">
        <a-card :style="{ width: '360px' }" title="平台提交统计" class="hover-commit">
          <div class="commit">
            <div>
              <div><img width="30px" src="../assets/icon/提交成功.png" alt="" /></div>
              <div style="padding: 5px; font-size: 20px">1</div>
              <div>总提交</div>
            </div>
            <div>
              <div><img width="30px" src="../assets/icon/奖杯.png" alt="" /></div>
              <div style="padding: 5px; font-size: 20px">1</div>
              <div>通过数</div>
            </div>
            <div>
              <div><img width="30px" src="../assets/icon/折线图.png" alt="" /></div>
              <div style="padding: 5px; font-size: 20px">1</div>
              <div>通过率</div>
            </div>
          </div>
        </a-card>
        <a-card
          :style="{ width: '360px', marginTop: '20px' }"
          title="题目标签按标签筛选"
          class="hover-commit"
        >
          <a-tag
            class="tag-class"
            v-for="(item, index) in tags"
            :key="index"
            :style="{
              color: selectedTags.includes(item) ? 'var(--color-text-1)' : 'var(--color-text-2)',
              backgroundColor: selectedTags.includes(item)
                ? 'var(--color-primary-light-1)'
                : 'transparent',
            }"
            @click="handleTagClick(item)"
          >
            {{ item }}
          </a-tag>
        </a-card>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import router from '@/router'
import { reactive, ref, watch } from 'vue'
import { QuestionControllerService, TagControllerService } from '@/generated'
import { IconArrowFall, IconArrowRise } from '@arco-design/web-vue/es/icon'

// 封装 Question 类型
interface QuestionListVo {
  id: string
  name: string
  tags: string[]
  completionRate: number
  submitNum: number
}

const pagination = reactive({
  total: 0,
})
const pageSize = ref(5)
const pageSizes = ref([5, 10, 20, 30, 50])
const searchData = ref('')
const data = ref<QuestionListVo[] | undefined>(undefined)
const total = ref(0)
const selectedTags = ref([])
// 用于跟踪第一个 div 是否被选中
const isFilter1Selected = ref(false)
// 用于跟踪第二个 div 是否被选中
const isFilter2Selected = ref(false)
const isMobile = ref(window.innerWidth <= 768)

window.addEventListener('resize', () => {
  isMobile.value = window.innerWidth <= 768
})

const tags = ref([])
interface QuestionRequest {
  type: number
  sort?: number
  page: number
  size: number
  id?: number
  filter?: number
  tags?: string
  search?: string
}
// 封装请求函数
const fetchQuestions = (
  findType: number,
  sort: number | undefined,
  page: number,
  size: number,
  id: number | undefined,
  filter: number | undefined,
  tags: string | undefined,
  search: string | undefined,
) => {
  const requestBody: QuestionRequest = {
    questionName: search,
    id: id,
    sort: sort,
    findType: findType,
    pageNow: page,
    pageSize: size,
    tags: tags ? tags.split(',') : undefined,
    submitNumOrderType: sort,
  }

  return QuestionControllerService.questions(requestBody).then((res) => {
    data.value = res.data!.records
    total.value = res.data!.total
    pagination.total = res.data!.total
  })
}

watch(pageSize, () => {
  getList()
})

TagControllerService.list({ type: 0, count: 100, page: 1 }).then((res) => {
  const tagsa = res.data.records
  tagsa.forEach((item) => {
    tags.value.push(item.name)
  })
})

// 处理标签点击事件的函数
const handleTagClick = (tag: string) => {
  const index = selectedTags.value.indexOf(tag)
  if (index > -1) {
    // 如果标签已选中，将其从选中列表中移除
    selectedTags.value.splice(index, 1)
  } else {
    // 如果标签未选中，将其添加到选中列表中
    selectedTags.value.push(tag)
  }

  if (selectedTags.value.length <= 0) {
    getList()
  } else {
    const filter = isFilter1Selected.value ? 1 : 0
    fetchQuestions(4, 1, 1, 10, undefined, filter, JSON.stringify(selectedTags.value), undefined)
  }
}

const change = (page: number) => {
  fetchQuestions(0, undefined, page, pageSize.value, undefined, undefined, undefined, undefined)
}

const selectFilter = (filterIndex: number) => {
  // 重置所有的选中状态
  isFilter1Selected.value = false
  isFilter2Selected.value = false

  // 根据点击的索引设置对应的选中状态
  if (filterIndex === 1) {
    isFilter1Selected.value = true
  } else if (filterIndex === 2) {
    isFilter2Selected.value = true
  }

  const filter = filterIndex === 1 ? 1 : 0
  fetchQuestions(4, filter, 1, 5, undefined, filter, JSON.stringify(selectedTags.value), undefined)
}

const getList = () => {
  fetchQuestions(0, 1, 1, pageSize.value, undefined, undefined, undefined, undefined)
}

const reset = () => {
  selectedTags.value = []
  isFilter1Selected.value = false
  isFilter2Selected.value = false
  getList()
}

getList()

// 模拟编辑操作
const handleDo = (id: number) => {
  router.push('/questionView/' + id)
}

const getRandomColor = () => {
  const letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

watch(searchData, () => {
  if (searchData.value === '') {
    getList()
  } else if (Number.isNaN(Number(searchData.value))) {
    fetchQuestions(2, undefined, 1, 10, undefined, 0, undefined, searchData.value)
  } else {
    fetchQuestions(1, undefined, 1, 10, Number(searchData.value), undefined, undefined, undefined)
  }
})
</script>

<style scoped>
.tag-class {
  margin: 5px;
  cursor: pointer;
}

.commit {
  display: flex;
  justify-content: space-around;
  padding: 20px;
  height: 80%;
  text-align: center;
  border-radius: 10px;
  background-color: #f8f9fa;
}

.dark .commit {
  background-color: black;
}
.card-list {
  display: flex;
  flex-direction: column;
}

.filter-hover {
  padding: 10px;
  cursor: pointer;
}

.filter-selected {
  color: #22bfa7;
  background: rgba(34, 191, 167, 0.1);
}

.filter-reset-hover {
  padding: 10px;
  cursor: pointer;
}

.filter-hover:hover {
  color: #22bfa7;
  background: rgba(34, 191, 167, 0.1);
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

.ellipsis-text {
  white-space: nowrap;
  /* 禁止换行 */
  overflow: hidden;
  /* 隐藏溢出内容 */
  text-overflow: ellipsis;
  /* 显示省略号 */
  max-width: 100px;
  /* 与列宽一致 */
}

@media (max-width: 768px) {
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
