// 添加请求拦截器
import { TOKEN_KEY } from '@/utils/contant';
import axios from 'axios';

function getBaseUrl() {
  if (process.env.NODE_ENV === 'development') return 'http://localhost:9191';
  //todo:更改线上地址
  else if (process.env.NODE_ENV === 'production') return 'url';
}

const baseUrl = getBaseUrl();
// 添加请求拦截器
axios.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    console.log('env:', process.env);
    config.baseURL = baseUrl;
    console.log('cc:', config);
    //添加token到头部
    const token = localStorage.getItem(TOKEN_KEY);
    if (token && token.trim()) {
      config.headers['Authorization'] = token;
    }
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  },
);

// 添加响应拦截器
axios.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    //todo:对响应错误进行处理
    console.log('请求响应:', response);
    return response;
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  },
);
