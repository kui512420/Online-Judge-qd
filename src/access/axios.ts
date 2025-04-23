import axios from "axios";
import { UserControllerService } from "@/generated";
const service = axios.create({
  url:"http://127.0.0.1:5210",
  withCredentials:true
});

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  config.headers["AccessToken"] = localStorage.getItem("AccessToken")
  if(config.url?.includes("/api/user/refreshToken")){
    config.headers["RefreshToken"] = localStorage.getItem("RefreshToken")
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(async function (response) {

  if(response.data.code==40000){
    const success = await UserControllerService.refreshToken(localStorage.getItem("RefreshToken")??"")
    console.log(success)
    if (success) {
      localStorage.setItem("AccessToken",success.data?.accesstoken)
      response.config.headers = {
        AccessToken:success.data?.accesstoken
      }
      const result = await service.request(response.config);
      return result;
    }
    return response;
  }
  return response;
}, function (error) {
  return Promise.reject(error);
});

export default service

