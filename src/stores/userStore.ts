import { ref } from 'vue'
import { defineStore } from 'pinia'
import AccessEnum from '@/access/accessEnum'
import {UserControllerService} from '@/generated'

export const useUserStore = defineStore('user', () => {
  const user = ref({
    userAccount:"",
    userRole:AccessEnum.NOT_LOGIN
  })
  const theme = false
  const login = async ()=>{
    await UserControllerService.getLoginUsingGet().then((res)=>{
      user.value.userAccount = res.data?.userAccount??""
      user.value.userRole = res.data?.userRole??AccessEnum.NOT_LOGIN
    })
  }
  return { user,theme,login }
})
