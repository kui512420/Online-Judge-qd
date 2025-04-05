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
        path:"",
        redirect:"登录",
        name:"重定向"
      },
      {
        path:"login",
        name:"登录",
        component: ()=>import("@/views/user/UserLoginView.vue"),
      },
      {
        path:"register",
        name:"注册",
        component: ()=>import("@/views/user/UserRegisterView.vue")
      }
    ]
  },
  {
    path:"/",
    name:"首页",
    component: ()=>import("@/views/IndexView.vue")
  },

  {
    path:"/questionBank",
    name:"题库",
    component: ()=>import("@/views/QuestionBankView.vue"),
    meta:{
      access:AccessEnum.NOT_LOGIN
    },
  },
  {
    path:"/competition",
    name:"竞赛",
    component: ()=>import("@/views/CompetitionView.vue"),
    meta:{
      access:AccessEnum.NOT_LOGIN
    },
  },
  {
    path:"/rankingList",
    name:"排行榜",
    component: ()=>import("@/views/CompetitionView.vue"),
    meta:{
      access:AccessEnum.NOT_LOGIN
    },
  },
  {
    path:"/management",
    name:"后台管理",
    meta:{
      access:AccessEnum.ADMIN
    },
    component: ()=>import("@/layouts/ManagementLayouts.vue"),
    children:[
      {
        path:"",
        redirect:"/management/index",
        name:"managementRed"
      },
      {path:"index",name:"managementIndex",component:()=>import("@/views/management/IndexView.vue")},
      {path:"user",name:"managementUser",component:()=>import("@/views/management/UserView.vue")},
      {
        path:"question",name:"managementQuestion",component:()=>import("@/views/management/QuestionView.vue"),
      },
      {
        path:"question/put",
        name:"managementQuestionPut",
        component:()=>import("@/views/management/question/QuestionEditView.vue")
      }
    ]
  },
  {
    path:"/personalCenter",
    name:"个人中心",
    meta:{
      isHidden:true
    },
    component: ()=>import("@/views/PersonalCenterView.vue")
  },
  {
    path:"/questionView/:id",
    name:"题目作答页",
    component: ()=>import("@/views/question/QuestionSubmitView.vue"),
    meta:{
      isHidden:true
    },
  },
  {
    path:"/:pathMatch(.*)*",
    name:"NoFind",
    meta:{
      isHidden:true
    },
    component: ()=>import("@/views/NoFindView.vue")
  }
]

export default routes
