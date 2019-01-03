// 对请求进行配置
import axios from "axios"
// 环境切换
if (process.env.NODE_ENV == 'development') {
  axios.defaults.baseURL = 'http://10.122.10.244:82/ydzs/';
} else if (process.env.NODE_ENV == 'production') {
  // axios.defaults.baseURL = 'https://www.production.com';
}
axios.defaults.timeout = 10000;
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.headers.common['Authorization'] = 'Bearer 29ff4d69bd3243de951e79169ce193e3'; // token写死了
//请求响应器
axios.interceptors.response.use(
  response => {
    if (response.data.d && response.data.d !== undefined) {
      const data = JSON.parse(response.data.d.Data)
      if (response.data.d.Success === true) {
        return Promise.resolve(data);
      } else {
        return Promise.reject(response); //增加对错误的处理改正
      }
    }
  },
  error => {
    // 错误处理
  }
)
/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
        params: params
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err)
      })
  });
}
/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err.data)
      })
  });
}
