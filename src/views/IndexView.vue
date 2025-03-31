<template>
  <div class="">
    <div class="page-one">
      <div class="title title-up">
        <h1 class="title-size">KUIKUI OJ</h1>
      </div>
      <div class="content-up">
        <div class="desc">专注于算法竞赛的在线评测系统</div>
        <div class="desc-add">为编程爱好者提供专业的算法训练平台</div>
        <div class="btn-group">
          <a-button @click="goQuestionBank" type="primary" status="success" class="btn-item">
            <template #icon>
              <icon-code />
            </template>
            <template #default>开始刷题</template>
          </a-button>

          <a-button type="primary" class="btn-item">
            <template #icon>
              <icon-trophy />
            </template>
            <template #default>参加比赛</template>
          </a-button>

          <a-button type="primary" class="btn-item">
            <template #icon>
              <icon-bar-chart />
            </template>
            <template #default>查看排名</template>
          </a-button>
        </div>
      </div>
    </div>

    <div class="page-two">
      <div>
        <h3 class="title-size-two">功能特色</h3>
        <a-carousel
          :style="{
            width: '100%',
            height: '240px',
            margin: '0 auto',
          }"
          :auto-play="true"
          trigger="hover"
          animation-name="fade"
          show-arrow="never"
        >
          <a-carousel-item v-for="(item,index) in images" :key="index">

             <div class="image-container">
              <div>
                <h2>{{item.title}}</h2>
                <div>{{item.desc}}</div>
                <ul>
                  <li  v-for="(item2,index2) in item.list" :key="index2">{{item2}}</li>
                </ul>
              </div>

            <img
              :src="item.img"
              :style="{
                width: '60%',
              }"
            />
             </div>
          </a-carousel-item>
        </a-carousel>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import router from '@/router/index'
import { IconCode, IconTrophy, IconBarChart} from '@arco-design/web-vue/es/icon'
const images = [
  {
    img:"https://publicqn.saikr.com/saikr-oj/files_675aaad54d0f0.png",
    title:"智能评测系统",
    desc:"强大的评测引擎支持多种编程语言，毫秒级响应",
    list:[
      "支持 C/C++、Java、Python 等多种语言",
      "实时评测反馈",
      "详细的错误分析"
    ]
  }

]
const goQuestionBank = () => {
  router.push('/questionBank')
}
</script>

<style scoped>
.title {
  margin: 0 auto;
  padding: 5px;
  width: 250px;
  border-bottom: 10px solid black;
}
.image-container {
  display: flex;
  justify-content: flex-end;
  height: 100%;
}
.btn-group {
  width: 50%;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
}
.page-one {
  height: 600px;
  text-align: center;
}
.desc-add {
  padding: 40px;
  font-size: 18px;
}
.desc {
  color: #333;
  font-size: 30px;
  padding: 20px;
}
.title-size {
  font-size: 40px;
}
.title-size-two {
  font-size: 30px;
  text-align: center;
}
@keyframes slide-up {
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
@media (max-width: 768px) {
  .title {
    width: 200px;
    border-bottom-width: 8px;
  }
  .desc {
    font-size: 24px;
  }
  .desc-add {
    font-size: 8px;
  }
  .title-size {
    font-size: 32px;
  }
  .btn-group {
    width: 80%;

    flex-direction: column;
    align-items: center;
  }
  .btn-group .btn-item {
    margin-bottom: 10px;
  }
}
.title-up {
  animation: slide-up 0.5s ease-out;
}
.content-up {
  animation: slide-up 0.8s ease-out;
}
</style>
