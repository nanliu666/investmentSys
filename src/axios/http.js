// 对请求进行配置
import axios from "axios"
import Vue from 'vue'
// 环境切换
if (process.env.NODE_ENV == 'development') {
  axios.defaults.baseURL = 'http://10.122.10.244:82/ydzs/';
} else if (process.env.NODE_ENV == 'production') {
  // axios.defaults.baseURL = 'https://www.production.com';
}
axios.defaults.timeout = 10000;
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
// axios.defaults.headers.common['Authorization'] = 'Bearer 29ff4d69bd3243de951e79169ce193e3'; // 不使用token了

axios.interceptors.request.use(
  config => {
    Vue.$vux.loading.show({
      text: 'Loading' //以plugin形式调用
    })
    config.params = {
      'loginname': 'yujing'
    };
    return config
  },
  err => {
    Vue.$vux.loading.hide()
    Vue.$vux.toast.text('请求错误', 'top') //以plugin形式调用
    return Promise.reject(err)
  }
)
//请求响应器
axios.interceptors.response.use(
  response => {
    if (response.data.d && response.data.d !== undefined) {
      Vue.$vux.loading.hide()
      if (response.data.d.Success === true) {
        return Promise.resolve(JSON.parse(response.data.d.Data));
      } else {
        Vue.$vux.toast.text(res.data.Message, 'top')
        return Promise.reject(response); //增加对错误的处理改正
      }
    }
    err => {
      Vue.$vux.loading.hide()
      Vue.$vux.toast.text('请求失败，请稍后再试', 'top')
      return Promise.reject(err)
    }
  },
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
