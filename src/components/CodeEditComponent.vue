<template>
  <div class="wapper">
    <a-split :style="{
        height: 'auto',
        width: '100%',
        minWidth: '500px',
        border: '1px solid var(--color-border)'
      }"
      v-model:size="size"
      min="80px"
    >
      <template #first>
        <a-typography-paragraph>
          <div>
      <a-tabs default-active-key="1" size="large">
        <a-tab-pane key="1" title="题目">
          <a-list>
            <template #header>
              A+B
            </template>
            <a-list-item>
              <div>
                <h3>判题规则</h3>
                <div class="rule">
                  <div>时间限制 50000ms</div>
                  <div>内存限制 5050kb</div>
                  <div>堆栈限制 5050</div>
                </div>
              </div>
              <div>
                <h2>问题描述</h2>
              </div>
              <div>
                <h2>输入格式</h2>
              </div>
              <div>
                <h2>输出格式</h2>
              </div>
            </a-list-item>
          </a-list>
        </a-tab-pane>
        <a-tab-pane key="2" title="评论">
          评论
        </a-tab-pane>
        <a-tab-pane key="3">
          <template #title>提交记录</template>
          提交记录
        </a-tab-pane>
        <a-tab-pane key="4">
          <template #title>AI小助手</template>
          AI小助手
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
        <a-collapse  style="background-color: black; width: 100%;  z-index: 999; position: absolute; bottom: 0;">
          <div style="width: 30%; margin: 0 auto;">
            <a-button type="primary" status="warning">调试</a-button>
            <a-button type="primary" style="margin-left: 20px;">提交检测</a-button>
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
const size = ref(0.35)
// 定义选中的语言
const selectedLanguage = ref('java');
// 定义编辑器实例
let editor: monaco.editor.IStandaloneCodeEditor | null = null;

onMounted(() => {
  const container = document.getElementById('container');
  if (!container) return;

  // 配置Java语言支持（需额外加载Java语法定义）
  monaco.languages.register({ id: 'java' });
  monaco.languages.setMonarchTokensProvider('java', {
    // 基础语法高亮定义（简化版）
    tokenizer: {
      root: [
        [/public\s+/, 'keyword'],
        [/class\s+/, 'keyword'],
        [/[A-Z][a-zA-Z0-9]*/, 'type'],
        [/System\.out\.println/, 'method'],
        [/"[^"]*"/, 'string']
      ]
    }
  });

  // 创建编辑器实例
  editor = monaco.editor.create(container, {
    value: `public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, Java!"); // 这是Java代码
        // 以下是Java语法演示：
        int x = 10;
        String message = "Monaco Editor";
        System.out.println(message + ", version: " + x);
    }
}`,
    language: selectedLanguage.value,
    theme: 'vs-dark', // 深色主题
    automaticLayout: true, // 自动适应容器大小
    lineNumbers: 'on', // 显示行号
    wordWrap: 'on', // 自动换行
    fontSize: 14,
    scrollBeyondLastLine: false // 禁止滚动到最后一行外
  });

  // 可选：添加Java特有的代码提示（需更完整的语言服务）
  editor.addAction({
    id: 'java-snippet',
    label: 'Insert Java main method',
    keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_M],
    run: () => {
      editor?.insertSnippet(`public static void main(String[] args) {\n\t$0\n}`);
    }
  });
});

// 切换语言的函数
const changeLanguage = () => {
  if (editor) {
    let codeValue = '';
    switch (selectedLanguage.value) {
      case 'java':
        codeValue = `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, Java!");
        int x = 10;
        String message = "Monaco Editor";
        System.out.println(message + ", version: " + x);
    }
}`;
        break;
      case 'python':
        codeValue = `print("Hello, Python!")
x = 10
message = "Monaco Editor"
print(f"{message}, version: {x}")`;
        break;
      case 'javascript':
        codeValue = `function hello() {
    console.log("Hello, JavaScript!");
    let x = 10;
    let message = "Monaco Editor";
    console.log(message + ", version: " + x);
}`;
        break;
    }
    editor.setValue(codeValue);
    editor.getModel()?.updateOptions({ language: selectedLanguage.value });
  }
};
watch(() => selectedLanguage, () => {
  changeLanguage()
}, { deep: true })

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
