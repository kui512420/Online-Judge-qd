import type { RouteRecordRaw } from 'vue-router';
const routes:Array<RouteRecordRaw> =  [
  {
    path:"/",
    name:"首页",
    meta:{
      access:"admin"
    },
    component: ()=>import("@/components/Hd.vue")
  },

  {
    path:"/home",
    name:"题库",
    component: ()=>import("@/components/Co.vue")
  }
]

export default routes
