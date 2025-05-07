<template>
  <div class="wapper">
    <a-breadcrumb>
      <template #separator>
        <icon-right />
      </template>
      <a-breadcrumb-item><router-link to="/competition">竞赛</router-link> </a-breadcrumb-item>
      <a-breadcrumb-item>{{ comDetail?.name ?? '加载中...' }}</a-breadcrumb-item>
    </a-breadcrumb>

    <a-card>
      <div style="display: flex; align-items: center; justify-content: space-between">
        <div>
          <h3>{{ comDetail?.name ?? '加载中...' }}</h3>
          <p>
            {{ comDetail?.description ?? '加载中...' }}
          </p>
          <p>开赛时间：{{ comDetail?.startTime ?? '加载中...' }}</p>
          <p>结束时间：{{ comDetail?.endTime ?? '加载中...' }}</p>
        </div>

        <div><a-button>挑战</a-button></div>
      </div>
    </a-card>
    <div>
      <a-tabs default-active-key="1">
        <a-tab-pane key="1" title="题目列表">
          <template #title>题目列表</template>
          <div class="question-list-container">
            <a-spin :loading="loading" style="width: 100%">
              <a-table :data="questionList" :bordered="false" :pagination="false">
                <template #columns>
                  <a-table-column title="题目名称" data-index="title">
                    <template #cell="{ record }">
                      <a @click="goToQuestion(record.id)">{{ record.title }}</a>
                    </template>
                  </a-table-column>
                  <a-table-column title="标签" data-index="tags">
                    <template #cell="{ record }">
                      <a-space>
                        <a-tag v-for="tag in parseTags(record.tags)" :key="tag" color="blue">{{
                          tag
                        }}</a-tag>
                      </a-space>
                    </template>
                  </a-table-column>
                  <a-table-column title="提交数" data-index="submitNum" :width="100" />
                  <a-table-column title="通过数" data-index="acceptedNum" :width="100" />
                </template>
              </a-table>
            </a-spin>
          </div>
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
import { CompetitionControllerService, QuestionControllerService } from '@/generated'
import { IconRight } from '@arco-design/web-vue/es/icon'
import { onMounted, ref, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { QuestionListVo } from '@/generated/models/QuestionListVo'
import type { PaginationProps } from '@arco-design/web-vue'

const comID = ref()
const comDetail = ref({})
const questionList = ref<QuestionListVo[]>([])
const loading = ref(false)
const router = useRouter()

// 分页配置
const pagination = reactive<PaginationProps>({
  total: 0,
  current: 1,
  pageSize: 10,
  showTotal: true,
  showJumper: true,
})

// 获取竞赛题目列表
const fetchQuestionList = async (page = 1) => {
  loading.value = true
  try {
    // 直接通过竞赛ID获取题目列表
    const res = await CompetitionControllerService.getCompetitionQuestions(comID.value)

    if (res.data && Array.isArray(res.data)) {
      // 获取到题目列表后，设置分页信息
      const startIndex = (page - 1) * pagination.pageSize
      const endIndex = Math.min(startIndex + pagination.pageSize, res.data.length)

      questionList.value = res.data.slice(startIndex, endIndex)
      pagination.total = res.data.length
    } else if (res.data && res.data.records) {
      questionList.value = res.data.records
      pagination.total = res.data.total || 0
    }
  } catch (error) {
    console.error('获取题目列表失败', error)
  } finally {
    loading.value = false
  }
}

// 页码变化
const onPageChange = (page: number) => {
  pagination.current = page
  fetchQuestionList(page)
}

// 解析标签
const parseTags = (tags: string | undefined) => {
  if (!tags) return []
  try {
    return JSON.parse(tags)
  } catch {
    return tags.split(',')
  }
}

// 跳转到题目详情
const goToQuestion = (id: number) => {
  router.push(`/questionView/${id}`)
}

onMounted(() => {
  const route = useRoute()
  comID.value = route.params.id
  CompetitionControllerService.getCompetitionDetail(comID.value).then((res) => {
    comDetail.value = res.data
    // 获取竞赛题目列表
    fetchQuestionList()
  })
})
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
