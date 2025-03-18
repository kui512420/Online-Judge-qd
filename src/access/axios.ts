import axios from "axios";
import { UserControllerService } from "@/generated";
const service = axios.create({
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
    const success = await UserControllerService.refreshTokenUsingGet()
    if (success) {
      localStorage.setItem("AccessToken",success.data?.accesstoken)
      response.config.headers = {
        AccessToken:success.data?.accesstoken
      }
      const result = await service.request(response.config);
      console.log(result)
      return result;
    }
    return response;
  }
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error);
});


