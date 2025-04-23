<template>
  <div class="wapper">
    <a-split :style="{
      height: '100vh',
      width: '100%',
      minWidth: '500px',
      border: '1px solid var(--color-border)'
    }" v-model:size="size" min="80px">
      <template #first>
        <a-typography-paragraph>
          <div>
            <a-tabs @tab-click="getData" default-active-key="1" size="large">
              <a-tab-pane key="1" title="题目">
                <a-list>
                  <template #header v-if="info">
                    {{ info?.title }}
                  </template>
                  <a-list-item>
                    <div v-if="info">
                      <h3>判题规则</h3>
                      <div class="rule">
                        <div>时间限制 {{ JSON.parse(info?.judgeConfig || '{}').timeLimit }}ms</div>
                        <div>内存限制 {{ JSON.parse(info?.judgeConfig || '{}').memoryLimit }}kb</div>
                      </div>
                    </div>
                    <div v-if="info">
                      <h2>问题描述</h2>
                      <v-md-preview :text=info?.content></v-md-preview>
                    </div>
                    <div v-if="info">
                      <h2>输入格式</h2>
                      {{ JSON.parse(info.judgeCase)[0].input }}
                    </div>
                    <div v-if="info">
                      <h2>输出格式</h2>
                      {{ JSON.parse(info?.judgeCase || '{}')[0].output }}
                    </div>
                  </a-list-item>
                </a-list>
              </a-tab-pane>
              <a-tab-pane key="2" title="评论">
                评论
              </a-tab-pane>
              <a-tab-pane key="3">
                <template #title>提交记录</template>
                <QuestionSubmitRecord :list=recordInfo></QuestionSubmitRecord>
                <a-pagination :total="50" />
              </a-tab-pane>
              <a-tab-pane key="4">
                <template #title>AI小助手</template>
                <AiComponent></AiComponent>
              </a-tab-pane>
            </a-tabs>
          </div>
        </a-typography-paragraph>
      </template>
      <template #second>
        <a-typography-paragraph>
          <div>
            <div>
              <a-select v-model="selectedLanguage" placeholder="Please select ..." allow-clear>
                <a-option value="java">java</a-option>
                <a-option value="python">python</a-option>
                <a-option value="javascript">javascript</a-option>
              </a-select>
            </div>
            <div style="position: relative;">
              <div id="container" style="width: auto; height: 600px;"></div>
              <a-collapse style="background-color: black; width: 100%;  z-index: 999; position: absolute; bottom: 0;">
                <div style="width: 30%; margin: 0 auto;">
                  <a-button type="primary" status="warning">调试</a-button>
                  <a-button type="primary" style="margin-left: 20px;" @click="submit">提交检测</a-button>
                </div>
                <a-collapse-item header="打开调试器" key="1">
                  <a-tabs default-active-key="1">
                    <a-tab-pane key="1" title="测试用例">
                      <a-textarea placeholder="请输入测试用例" allow-clear />
                    </a-tab-pane>
                    <a-tab-pane key="2" title="代码执行结果">
                      <div>暂无执行结果</div>
                    </a-tab-pane>
                  </a-tabs>
                </a-collapse-item>
              </a-collapse>
            </div>
          </div>
        </a-typography-paragraph>
      </template>
    </a-split>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import * as monaco from 'monaco-editor';
import { useRoute } from 'vue-router';
import QuestionSubmitRecord from './QuestionSubmitRecord.vue';
import AiComponent from './AiComponent.vue';
import { QuestionControllerService, QuestionSubmitControllerService } from '@/generated';
import 'monaco-editor/esm/vs/basic-languages/java/java.contribution';
import 'monaco-editor/esm/vs/basic-languages/python/python.contribution';
import 'monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution';
import { Message } from '@arco-design/web-vue';
const activekey = ref("1")
const route = useRoute();
const size = ref(0.35);
const info = ref();
const recordInfo = ref()
const selectedLanguage = ref('java');
let editor: monaco.editor.IStandaloneCodeEditor | null = null;

// 代码模板
const codeTemplates = {
  java: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, Java!");
    }
}`,
  python: `print("Hello, Python!")`,
  javascript: `console.log("Hello, JavaScript!");`
};

// 获取题目数据
const fetchData = async () => {
  try {
    const res = await QuestionControllerService.questionInfo(BigInt(route.params.id));
    info.value = res.data;
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }
};

// 初始化编辑器
const initEditor = () => {
  const container = document.getElementById('container');
  if (!container) return;

  editor = monaco.editor.create(container, {
    value: codeTemplates[selectedLanguage.value as keyof typeof codeTemplates],
    language: selectedLanguage.value,
    theme: 'vs-dark',
    automaticLayout: true,
    lineNumbers: 'on',
    wordWrap: 'on',
    fontSize: 14,
    scrollBeyondLastLine: false
  });
};
setTimeout(() => {
  console.log(editor.getValue())
}, 5000)
// 切换语言
const changeLanguage = () => {
  if (!editor) return;
  editor.setValue(codeTemplates[selectedLanguage.value as keyof typeof codeTemplates]);
  editor.getModel()?.updateOptions({ language: selectedLanguage.value });
};

// 生命周期钩子
onMounted(() => {
  fetchData();
  initEditor();
});
const submit = () => {
  const requestBody = {
    language: selectedLanguage.value,
    code: editor?.getValue(),
    questionId: (route.params.id)
  }
  console.log(requestBody)
  QuestionSubmitControllerService.submitQuestion(requestBody).then((res) => {
    if (res.code == 200) {
      Message.success("提交成功，等待判题")
    }
  })
}
// 监听语言变化
watch(selectedLanguage, changeLanguage);
const getData = (e) => {
  if (e == 3) {
    const requestBody = {
      page: 1,
      size: 5,
      type: 3,
      questionId: route.params.id
    }
    QuestionSubmitControllerService.submitQuestionList(requestBody).then((res) => {
      recordInfo.value = res.data
    })
  }
}

</script>

<style scoped>
.wapper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.rule {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
}

/* 解决容器高度塌陷问题 */
#container {
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
}
</style>
