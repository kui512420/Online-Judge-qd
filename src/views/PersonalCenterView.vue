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
      <span><h3>kuikui</h3> <span>加入OJ时间：2022-12-06</span></span>
      <div style="margin-top: 10px;">
        <a-input :style="{width:'220px'}" default-value="" placeholder="修改名称" allow-clear />
        <a-button type="primary">保存</a-button>
      </div>
    </a-card>
  </div>
</template>

<script setup lang='ts'>
</script>
<style scoped></style>
