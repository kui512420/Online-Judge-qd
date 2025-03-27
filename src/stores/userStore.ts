import { ref } from 'vue'
import { defineStore } from 'pinia'
import AccessEnum from '@/access/accessEnum'
import { UserControllerService } from '@/generated'

export const useUserStore = defineStore('user', () => {
  const user = ref({
    id: '',
    userAccount: '',
    userRole: AccessEnum.NOT_LOGIN,
    userName: '',
    email: '',
    userAvatar: '',
    userProfile: '',
    creatTime: 0,
  })
  const theme = false
  const login = async () => {
    await UserControllerService.getLoginUsingGet().then((res) => {
      user.value.id = res.data?.id ?? ''
      user.value.userName = res.data?.userName ?? ''
      user.value.email = res.data?.email ?? ''
      user.value.userProfile = res.data?.userProfile ?? ''
      user.value.creatTime = res.data?.creatTime ?? 0
      user.value.userAvatar = res.data?.userAvatar ?? ''
      user.value.userAccount = res.data?.userAccount ?? ''
      user.value.userRole = res.data?.userRole ?? AccessEnum.NOT_LOGIN
    })
  }
  return { user, theme, login }
})
