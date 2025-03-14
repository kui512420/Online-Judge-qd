import AccessEnum from '@/access/accessEnum';
import type { RouteRecordRaw } from 'vue-router';
const routes:Array<RouteRecordRaw> =  [
  {
    path:"/user",
    name:"用户",
    meta:{
      isHidden:true
    },
    children:[
      {
        path:"/user/login",
        name:"登录",
        component: ()=>import("@/views/user/UserLoginView.vue")
      },
      {
        path:"/user/register",
        name:"注册",
        component: ()=>import("@/views/user/UseRegisterView.vue")
      }
    ]
  },
  {
    path:"/",
    name:"首页",
    component: ()=>import("@/views/IndexView.vue")
  },

  {
    path:"/home",
    name:"题库",
    component: ()=>import("@/views/SubjectView.vue")
  },
  {
    path:"/management",
    name:"管理",
    meta:{
      access:AccessEnum.ADMIN
    },
    component: ()=>import("@/views/ManagementView.vue")
  },
  {
    path:"/noAuth",
    name:"401",
    meta:{
      isHidden:true
    },
    component: ()=>import("@/views/NoAuthView.vue")
  }
]

export default routes
