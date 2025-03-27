<template>
  <div>
    <a-card title="个人中心" :bordered="true" style="max-width: 500px; margin: 0 auto;">
      <a-upload :custom-request="upload" :show-file-list="false">
        <template #upload-button>
          <a-avatar>
            <img alt="avatar" style="width: 100%; height: 100%;" :src=userInfo.userAvatar />
          </a-avatar>
        </template>

      </a-upload>
      <p>ID: <span style="padding-left: 10px;">{{ userInfo.id }}</span> </p>
      <a-divider />
      <p>基本信息</p>
      <a-divider dashed />
      <span>
        <h3>名称：{{ userInfo.userName ?? "未命名" }}</h3>
        <span>加入OJ时间：{{ userInfo.creatTime }}</span>
        <div style="margin-top: 10px;">邮箱：{{ userInfo.email }}</div>
        <div style="margin-top: 10px;">个人介绍：{{ userInfo.userProfile ?? "未填写" }}</div>

      </span>
      <div style="margin-top: 10px;">
        <a-input :style="{ width: '220px' }" default-value="" placeholder="修改名称" v-model="userInfo.userName"
          allow-clear />
        <a-button type="primary" @click="saveUserName">保存</a-button>
      </div>
      <div style="margin-top: 10px;">
        <a-input :style="{ width: '220px' }" default-value="" placeholder="修改个人简介" v-model="userInfo.userProfile"
          allow-clear />
        <a-button type="primary" @click="saveUserProfile">保存</a-button>
      </div>
      <a-divider />
      <p>修改密码</p>
      <a-divider dashed />
      <div style="margin-top: 10px;">
        <a-input-password :style="{ width: '220px' }" v-model="usrePassword" placeholder="旧密码" allow-clear />
      </div>
      <div style="margin-top: 10px;">
        <a-input-password :style="{ width: '220px' }" v-model="newUserPassword" placeholder="新密码" allow-clear />
      </div>

      <div style="margin-top: 10px; display: flex;">
        <a-input :style="{ width: '220px' }" v-model="code" placeholder="邮箱验证码" allow-clear />
        <SendButton :email="userInfo.email"></SendButton>
      </div>
      <div style="margin-top: 10px;">
        <a-button type="primary" @click="saveUserPassowrd">修改</a-button>
      </div>
    </a-card>
  </div>
</template>

<script setup lang='ts'>
import SendButton from '@/components/email/SendButton.vue';
import { FilleControllerService, UserControllerService } from '@/generated';
import router from '@/router';
import { useUserStore } from '@/stores/userStore';
import Message from '@arco-design/web-vue/es/message';
import message from '@arco-design/web-vue/es/message';

import { ref } from 'vue';
const userSotre = useUserStore()
const userInfo = ref({
  id: "",
  userName: "",
  email: "",
  userProfile: "",
  creatTime: "",
  userAvatar: "",
})
const code = ref('')
const usrePassword = ref('')
const newUserPassword = ref('')
const formatTimestamp = (timestamp: number) => {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
// 获取个人页面信息
const getInfos = () => {
  userInfo.value.creatTime = formatTimestamp(userSotre.user.creatTime)
  userInfo.value.userName = userSotre.user.userName
  userInfo.value.email = userSotre.user.email
  userInfo.value.userProfile = userSotre.user.userProfile
  userInfo.value.id = userSotre.user.id
  userInfo.value.userAvatar = userSotre.user.userAvatar
}
// 修改名称
const saveUserName = () => {

  UserControllerService.setUerNameUsingPut("", userInfo.value.userName).then((res) => {
    if (res.code == 200) {
      message.success("保存成功！")
      UserControllerService.refreshTokenUsingGet(localStorage.getItem("RefreshToken") ?? "").then((res) => {
        localStorage.setItem("AccessToken", res.data?.accesstoken)
      })
    } else {
      message.error(res.message)
    }
  })
}
// 修改个人介绍
const saveUserProfile = () => {

  UserControllerService.setUserProfileUsingPut(userInfo.value.userProfile).then((res) => {
    if (res.code == 200) {
      message.success("保存成功！")
      UserControllerService.refreshTokenUsingGet(localStorage.getItem("RefreshToken") ?? "").then((res) => {
        localStorage.setItem("AccessToken", res.data?.accesstoken)
      })
    } else {
      message.error(res.message)
    }
  })
}
// 修改密码
const saveUserPassowrd = () => {
  UserControllerService.setUserPasswordUsingPut("", { usrePassword: usrePassword.value, newUserPassword: newUserPassword.value, email: userInfo.value.email, code: code.value }).then((res) => {
    if (res.code == 200) {
      router.push("/")
      localStorage.removeItem("AccessToken")
      localStorage.removeItem("RefreshToken")
      Message.success("修改密码成功,请重新登录")
    } else {
      Message.error(res.message)
    }
  })
}
// 上传头像
const upload = (option) => {
  const { onProgress, onError, onSuccess, fileItem, name } = option
  // 创建 FormData 对象
  const formData = new FormData();
  // 将文件添加到 FormData 中
  formData.append('file', fileItem.file);
  console.log(fileItem.file)
  FilleControllerService.uploadFileUsingPost("",formData).then((res) => {
    console.log(res)
    userSotre.login()
  })
}
getInfos()
</script>
<style scoped></style>
