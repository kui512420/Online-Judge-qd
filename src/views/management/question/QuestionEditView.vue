<template>
  <div class="wapper">
    <div>
      题目标题： <a-input
        v-model="formData.title"
        :style="{width:'320px'}"
        placeholder="题目标题"
        allow-clear
      />
    </div>
    <div>
      题目标签：
      <a-input-tag
        v-model="formData.tagsArray"
        :style="{width:'320px'}"
        placeholder="题目标签"
        allow-clear
      />
    </div>
    <div>
      <div style="margin-bottom: 10px;">题目内容：</div>
      <v-md-editor v-model="formData.content" height="400px"></v-md-editor>
    </div>
    <div style="display: flex; align-items: left; flex-direction: column;">
      判题配置：
      <div>
        时间限制(ms)：
        <a-input-number
        style="margin-left: 3px; margin-bottom: 10px;"
          v-model="formData.timeLimit"
          :style="{width:'120px'}"
          placeholder="时间限制"
          :min="100"
          :max="5000"
          :step="100"
          mode="button"
          class="input-demo"
        />
      </div>
      <div>
        内存限制(MB)：
        <a-input-number
          v-model="formData.memoryLimit"
          :style="{width:'120px'}"
          placeholder="内存限制"
          :min="10"
          :max="1024"
          :step="10"
          mode="button"
          class="input-demo"
        />
      </div>
    </div>

    <div class="test-cases">
      <div class="test-cases-header">
        测试用例配置：
        <a-button type="outline" status="warning" @click="addTestCase">新增用例</a-button>
      </div>
      <div class="test-case-list">
        <div v-for="(testCase, index) in formData.testCases" :key="index" class="test-case-item">
          <div class="test-case-title">用例 {{ index + 1 }}</div>
          <div class="test-case-input">
            <span>输入：</span>
            <a-textarea
              v-model="testCase.input"
              placeholder="请输入测试用例输入"
              :auto-size="{ minRows: 2, maxRows: 5 }"
            />
          </div>
          <div class="test-case-output">
            <span>输出：</span>
            <a-textarea
              v-model="testCase.output"
              placeholder="请输入测试用例预期输出"
              :auto-size="{ minRows: 2, maxRows: 5 }"
            />
          </div>
          <a-button
            type="outline"
            status="danger"
            @click="removeTestCase(index)"
            class="remove-btn"
          >
            删除
          </a-button>
        </div>
      </div>
    </div>

    <div class="actions">
      <a-button type="primary" @click="handleSubmit" :loading="loading">保存题目</a-button>
      <a-button type="outline" @click="handleReset" style="margin-left: 12px;">重置</a-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Message } from '@arco-design/web-vue';
import { QuestionControllerService } from '@/generated';


interface TestCase {
  input: string;
  output: string;
}

interface FormData {
  title: string;
  tagsArray: string[]; // 用于前端展示和编辑
  content: string;
  timeLimit: number;
  memoryLimit: number;
  testCases: TestCase[];
}

const loading = ref(false);

const formData = ref<FormData>({
  title: '',
  tagsArray: [],
  content: '',
  timeLimit: 500,
  memoryLimit: 256,
  testCases: []
});

const addTestCase = () => {
  formData.value.testCases.push({
    input: '',
    output: ''
  });
};

const removeTestCase = (index: number) => {
  formData.value.testCases.splice(index, 1);
};

const handleSubmit = async () => {
  console.log(formData.value.tagsArray)
  // 简单验证
  if (!formData.value.title) {
    Message.error('请输入题目标题');
    return;
  }

  if (!formData.value.content) {
    Message.error('请输入题目内容');
    return;
  }

  if (formData.value.testCases.length === 0) {
    Message.error('请至少添加一个测试用例');
    return;
  }

  // 检查所有测试用例是否填写完整
  for (const [index, testCase] of formData.value.testCases.entries()) {
    if (!testCase.input || !testCase.output) {
      Message.error(`请完善测试用例 ${index + 1} 的输入和输出`);
      return;
    }
  }

  loading.value = true;

  try {
    // 构造请求参数
    const requestData = {
      title: formData.value.title,
      tags: JSON.stringify(formData.value.tagsArray),
      content: formData.value.content,
      judgeCase: JSON.stringify(formData.value.testCases),
      judgeConfig: JSON.stringify({
        timeLimit: formData.value.timeLimit,
        memoryLimit: formData.value.memoryLimit
      }),
      // userId 可以从用户信息中获取或留空让后端处理
    };

    // 调用API
    const response = await QuestionControllerService.questionUsingPost("", requestData);

    Message.success('题目保存成功');
    console.log('保存成功，返回数据:', response);

    // 可以在这里跳转到题目列表或其他页面
    // router.push('/question/list');
  } catch (error: any) {
    Message.error(`保存失败: ${error.message || '未知错误'}`);
    console.error('保存题目失败:', error);
  } finally {
    loading.value = false;
  }
};

const handleReset = () => {
  formData.value = {
    title: '',
    tagsArray: ['test'],
    content: '',
    timeLimit: 500,
    memoryLimit: 256,
    testCases: []
  };
  Message.success('已重置表单');
};
</script>

<style scoped>
.wapper {
  height: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-bottom: 40px;
}

.test-cases {
  margin-top: 10px;
}

.test-cases-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
}

.test-case-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.test-case-item {
  border: 1px solid #eee;
  padding: 15px;
  border-radius: 4px;
  position: relative;
}

.test-case-title {
  font-weight: bold;
  margin-bottom: 10px;
}

.test-case-input,
.test-case-output {
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-bottom: 10px;
}

.test-case-input span,
.test-case-output span {
  font-size: 14px;
}

.remove-btn {
  position: absolute;
  top: 15px;
  right: 15px;
}

.actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #eee;
}
</style>
