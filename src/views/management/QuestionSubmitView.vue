<template>
  <div>
    <div style="display: flex; align-items: center; margin-bottom: 10px">
      <a-select v-model="options" :style="{ width: '120px' }" placeholder="查询条件">
        <a-option>提交ID</a-option>
        <a-option>题目ID</a-option>
        <a-option>用户ID</a-option>
      </a-select>
      <a-input-search
        v-model="searchData"
        @click="search"
        :style="{ width: '320px' }"
        placeholder="请输入数据"
        search-button
      />
      <a-button status="warning" @click="exportFile">
        <template #icon>
          <icon-download></icon-download>
        </template>
        导出
      </a-button>

      <a-button type="dashed" @click="reset"> 重置 </a-button>
    </div>
    <a-table
      :columns="columns"
      row-key="id"
      :data="dataSource"
      column-resizable
      :bordered="{ cell: true }"
      :pagination="false"
      :row-selection="rowSelection"
      v-model:selectedKeys="selectedKeys"
    >
      <template #id="{ record }">
        <a-trigger class="ellipsis" position="top" auto-fit-position :unmount-on-close="false">
          <div>{{ record.id }}</div>
          <template #content>
            <div class="demo-basic">
              {{ record.id }}
            </div>
          </template>
        </a-trigger>
      </template>
      <template #title="{ record }">
        <div class="ellipsis">
          <a-trigger position="top" auto-fit-position :unmount-on-close="false">
            <div>{{ record.title }}</div>
            <template #content>
              <div class="demo-basic">
                {{ record.title }}
              </div>
            </template>
          </a-trigger>
        </div>
      </template>
      <template #tags="{ record }">
        <a-tag
          :color="getRandomColor()"
          v-for="(item, index) in JSON.parse(record.tags)"
          :key="index"
          bordered
          >{{ item }}</a-tag
        >
      </template>
      <template #language="{ record }">
        <a-tag
          :color="
            record.language === 'java'
              ? '#FFB800'
              : record.language === 'python'
                ? '#165DFF'
                : getRandomColor()
          "
          bordered
          >{{ record.language }}</a-tag
        >
      </template>
      <template #status="{ record }">
        <a-tag
          :color="
            record.status === 0
              ? '#86909C'
              : record.status === 1
                ? '#165DFF'
                : record.status === 2
                  ? '#00B42A'
                  : '#F53F3F'
          "
          bordered
        >
          {{
            record.status === 0
              ? '待判题'
              : record.status === 1
                ? '判题中'
                : record.status === 2
                  ? '成功'
                  : '失败'
          }}
        </a-tag>
      </template>
      <template #options="{ record }">
        <!-- 新增操作按钮 -->
        <div style="width: 50%; display: flex; align-items: center; justify-content: space-around">
          <a-button size="small" @click="edit(record)" type="outline">
            <template #icon>
              <icon-edit />
            </template>
            查看详情
          </a-button>
        </div>
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
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { IconDownload, IconEdit, IconDoubleDown, IconDelete } from '@arco-design/web-vue/es/icon'
import {
  AiControllerService,
  QuestionControllerService,
  QuestionSubmitControllerService,
  UserControllerService,
} from '@/generated'
import axios from 'axios'
import { Message } from '@arco-design/web-vue'
import router from '@/router'
const rowSelection = reactive({
  type: 'checkbox',
  showCheckedAll: true,
  onlyCurrent: false,
})
const pagination = reactive({
  total: 0,
})
const AIvisible = ref(false)
const pageSize = ref(5)
const pageSizes = ref([5, 10, 20, 30, 50])
const questionType = ref()
const questionDaf = ref()
const questionCount = ref(1)
const searchData = ref('')
const visible = ref(false)
const options = ref()
const selectedKeys = ref<number[]>([])
const columns = ref([
  {
    title: 'id',
    dataIndex: 'id',
    key: 'id',
    slotName: 'id',
    width: 120,
  },
  {
    title: '语言',
    dataIndex: 'language',
    key: 'language',
    slotName: 'language',
    width: 120,
    minWidth: 120,
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    slotName: 'status',
    width: 120,
    minWidth: 120,
  },
  {
    title: '题目ID',
    dataIndex: 'questionId',
    key: 'questionId',
    width: 180,
    minWidth: 180,
  },
  {
    title: '用户ID',
    dataIndex: 'userId',
    key: 'userId',
    slotName: 'userId',
    width: 180,
    minWidth: 180,
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
    slotName: 'createTime',
    width: 120,
  },
  {
    title: '操作',
    slotName: 'options',
  },
])
// 封装 Question 类型
interface QuestionListVo {
  id: string
  name: string
  tags: string[]
  completionRate: number
  submitNum: number
}
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
const data = ref<QuestionListVo[] | undefined>(undefined)
const dataSource = ref([])
const getRandomColor = () => {
  const letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}
const exportFile = () => {
  axios
    .post('/api/user/export', null, {
      responseType: 'blob',
    })
    .then((response) => {
      const blob = new Blob([response.data], { type: 'application/vnd.ms-excel' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = '用户.xls'
      a.click()
      window.URL.revokeObjectURL(url)
    })
    .catch(() => {
      Message.error('导出失败' + error)
    })
}

// 用户信息
const userInfo = ref()
watch(pageSize, () => {
  questionList()
})
const edit = (item) => {
  router.push('/management/question/edit/' + item.id)
}
const updateUserRole = (item, role) => {
  UserControllerService.putUserRole(item, role).then((res) => {
    if (res.code == 200) {
      Message.success('修改成功！')
      questionList()
    }
  })
}
const del = (item) => {
  QuestionControllerService.deleteQuestion(item.id).then((res) => {
    if (res.code == 200) {
      Message.success('删除成功！')
      questionList()
    }
  })
}
const delArr = () => {
  QuestionControllerService.deleteQuestions(selectedKeys.value).then((res) => {
    if (res.code == 200) {
      Message.success('删除成功！')
      selectedKeys.value = []
      questionList()
    }
  })
}
const change = (e) => {
  QuestionControllerService.questions({
    findType: 0,
    pageNow: e,
    pageSize: pageSize.value,
  }).then((res) => {
    dataSource.value = res.data!.records
    pagination.total = res.data!.total
  })
}
const handleCancel = () => {
  visible.value = false
}
const reset = () => {
  questionList()
  options.value = ''
  searchData.value = ''
}
const questionList = () => {
  const requestBody: QuestionRequest = {
    type: 0,
    page: 1,
    size: pageSize.value,
  }
  QuestionSubmitControllerService.submitQuestionList(requestBody).then((res) => {
    if (res.code == 200) {
      dataSource.value = res.data?.records
      pagination.total = res.data?.total ?? 0
    }
  })
}
const search = () => {
  if (searchData.value !== '') {
    if (options.value == 'ID') {
      const question = {
        id: searchData.value,
        findType: 1,
        pageNow: 1,
        pageSize: pageSize.value,
      }

      QuestionControllerService.questions(question)
        .then((res) => {
          if (res.code == 200) {
            dataSource.value = res.data?.records
            pagination.total = res.data?.total ?? 0
          }
        })
        .catch((e) => {
          Message.warning('参数异常')
        })
    } else if (options.value == '标题') {
      const question = {
        questionName: searchData.value,
        findType: 2,
        pageNow: 1,
        pageSize: pageSize.value,
      }
      QuestionControllerService.questions(question)
        .then((res) => {
          if (res.code == 200) {
            dataSource.value = res.data?.records
            pagination.total = res.data?.total ?? 0
          }
        })
        .catch((e) => {
          Message.warning('参数异常')
        })
    } else if (options.value == '标签列表') {
      const question = {
        tags: [searchData.value],
        findType: 3,
        pageNow: 1,
        pageSize: pageSize.value,
      }
      QuestionControllerService.questions(question)
        .then((res) => {
          if (res.code == 200) {
            dataSource.value = res.data?.records
            pagination.total = res.data?.total ?? 0
          }
        })
        .catch((e) => {
          Message.warning('参数异常')
        })
    } else {
    }
  }
}
const handleOk = () => {
  AiControllerService.ai({
    questionCount: questionCount.value + '',
    questionType: questionType.value,
    questionDifficulty: questionDaf.value,
  }).then((res) => {
    console.log(JSON.parse(JSON.stringify(res)))
  })
}
questionList()
</script>
<style scoped>
.demo-basic {
  padding: 10px;
  display: block;
  height: auto;
  background-color: var(--color-bg-popup);
  border-radius: 4px;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.15);
  white-space: normal;
  width: 200px;
  overflow-wrap: break-word;
  /* 使用 break-word 确保长单词换行 */
  word-break: break-all;
  /* 强制文本在边界处断开 */
  overflow: visible;
  /* 确保内容可见 */
}

.ellipsis {
  width: 100%;
  max-width: 200px;
  height: 30px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.info-item {
  display: flex;
  align-items: center;
}

.info-item div {
  margin-right: 5px;
}
</style>
