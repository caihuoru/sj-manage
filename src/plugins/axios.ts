import axios from "axios"
import router from '@/router'
import store from "@/store";
// import {refreshToken} from '@/api/login'
import message from 'ant-design-vue/es/message'

axios.defaults.baseURL = "/api";
axios.defaults.timeout = 30000;
axios.defaults.headers.post["Content-Type"] = "application/json;charset=UTF-8";
axios.defaults.headers.post["X-Requested-With"] = "XMLHttpRequest";
axios.defaults.headers.post["Cache-Control"] = "no-cache";
axios.defaults.headers.post["pragma"] = "no-cache";
//请求添加token
axios.interceptors.request.use((request: any) => {
    request.headers['token'] = (store as any).state.user.token || '';
    return request;
})

//登录过期跳转 TODO
axios.interceptors.response.use(response => {
    return response;
}, err => {
    return Promise.reject(err)
})

axios.interceptors.response.use((response: any) => {
    const data = response.data;
    //拦截所有错误的状态
    if (data && !data.code){
        return data
    } else {
        if (data){
          message.destroy()
          // 登录失效
          if (data.code === 10030) {
            return  message.error('賬號密碼錯誤');
          }
          if (data.code === 50000) {
              router.replace({
                path: '/login'
            })
            return data
          }
        }
        return data
    }
    
}, err => {
    const {
        response
    } = err;
    if (err && response) {
        message.destroy()
        switch (response.status) {
            case 400:
                message.error('错误请求');
                break;
            case 401:
                // message.error('未登录');
                break;
            case 403:
                message.error('未授权接口！');
                break;
            case 404:
                message.error('请求错误,未找到该资源');
                break;
            case 405:
                message.error('请求方法未允许');
                break;
            case 408:
                message.error('请求超时');
                break;
            case 500:
                message.error('服务器端出错');
                break;
            case 501:
                message.error('网络未实现');
                break;
            case 502:
                message.error('网络错误');
                break;
            case 503:
                message.error('服务不可用');
                break;
            case 504:
                message.error('网络超时');
                break;
            case 505:
                message.error('http版本不支持该请求');
                break;
            default:
                message.error('连接错误!错误码：' + response.status);
        }
    }
    console.log(err)
    if (err.code == 'ECONNABORTED') {
        message.error('请求超时!刷新重试。')
    }
    // 将异常抛出
    return Promise.reject(err)
})

export function post(url: string, data: any, otherConfig: any) {
    return axios.post(url, data, otherConfig);
}
export function put(url: string, data: any, otherConfig: any) {
    return axios.put(url, data, otherConfig);
}  
export function get(url: string, data: any, otherConfig: any) {
    return axios.get(url, { params: data, ...otherConfig });
}
export function patch(url: string, data: any, otherConfig: any) {
    return axios.patch(url, data, otherConfig);
}