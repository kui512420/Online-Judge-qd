import { ref } from 'vue'
import { defineStore } from 'pinia'

export const userStore = defineStore('user', () => {
  const userType = ref({
    status:"未登录"
  })


  return { userType}
})
