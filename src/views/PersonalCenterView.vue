<template>
  <div>
    <a-card title="个人中心" :bordered="true" style="max-width: 500px; margin: 0 auto;">
      <a-upload action="/" :fileList="file ? [file] : []" :show-file-list="false" @change="onChange"
        @progress="onProgress">
        <template #upload-button>
          <a-avatar>
            <img alt="avatar" style="width: 100%; height: 100%;"
              src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp" />
          </a-avatar>
        </template>
      </a-upload>
      <a-divider />
        <p>基本信息</p>
      <a-divider dashed />
      <span>
        <h3>kuikui</h3>

        <span>加入OJ时间：2022-12-06</span>
        <div style="margin-top: 10px;">邮箱：kui512420@163.com</div>
        <div style="margin-top: 10px;">个人介绍：Hello,World</div>

      </span>
      <div style="margin-top: 10px;">
        <a-input :style="{width:'220px'}" default-value="" placeholder="修改名称" allow-clear />
        <a-button type="primary">保存</a-button>
      </div>
      <div style="margin-top: 10px;">
        <a-input :style="{width:'220px'}" default-value="" placeholder="修改个人简介" allow-clear />
        <a-button type="primary">保存</a-button>
      </div>
      <a-divider />
        <p>修改密码</p>
      <a-divider dashed />
      <div style="margin-top: 10px;">
        <a-input :style="{width:'220px'}" default-value="" placeholder="旧密码" allow-clear />
      </div>
      <div style="margin-top: 10px;">
        <a-input :style="{width:'220px'}" default-value="" placeholder="新密码" allow-clear />
      </div>

      <div style="margin-top: 10px; display: flex;">
        <a-input :style="{width:'220px'}" v-model="code" placeholder="邮箱验证码" allow-clear />
        <SendButton :email="email"></SendButton>
      </div>
      <div style="margin-top: 10px;">
        <a-button type="primary">修改</a-button>
      </div>
    </a-card>
  </div>
</template>

<script setup lang='ts'>
import SendButton from '@/components/email/SendButton.vue';
import { ref } from 'vue';
const userInfo = ref('')
</script>
<style scoped></style>
