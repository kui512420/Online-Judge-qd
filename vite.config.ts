import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  //服务器配置
  server: {
    //配置端口
    host: '127.0.0.1', //本机地址
    port: 5210,  //通过5000端口号访问
    //配置反向代理
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8080',  // 后端服务地址（不带路径）
        changeOrigin: true,             // 解决跨域，修改请求源为后端地址
      },
    },
  },
})
