import { ref } from 'vue'
import { defineStore } from 'pinia'
import AccessEnum from '@/access/accessEnum'

export const userStore = defineStore('user', () => {
  const user = ref({
    name:"未登录",
    role:AccessEnum.NOT_LOGIN
  })
  const theme = false
  const Login = ()=>{

  }
  return { user,theme,Login }
})
