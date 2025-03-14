import { ref } from 'vue'
import { defineStore } from 'pinia'
import AccessEnum from '@/access/accessEnum'

export const userStore = defineStore('user', () => {
  const user = ref({
    name:"未登录",
    role:AccessEnum.NOT_LOGIN
  })
  const Login = ()=>{
    setTimeout(()=>{
      user.value.role = AccessEnum.ADMIN
      user.value.name = "魁魁"
    },3000)
    return 1
  }
  return { user,Login }
})
