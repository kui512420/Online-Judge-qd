import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import Message from '@arco-design/web-vue/es/message'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})
router.beforeEach((to)=>{

  if(to.path.startsWith("/questionView")){
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    if(isMobile){
      Message.warning("请使用电脑端做题哦")
      router.replace("/")
    }else{
      return
    }
  }
})
export default router
