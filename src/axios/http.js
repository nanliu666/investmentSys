// 对请求进行配置
import axios from "axios"
import Vue from 'vue'
axios.defaults.timeout = 7000;
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
axios.interceptors.request.use(
  config => {
    Vue.$vux.loading.show({
      text: '加载中' //以plugin形式调用
    })
    if (config.url.includes('/ydzs/WebService/MobileMerchants/')) { //黄鑫接口需要加一个参数
      config.params = {
        'loginname': 'yujing'
      };
    }
    return config
  },
  err => {
    Vue.$vux.loading.hide()
    Vue.$vux.toast.text('请求错误') //以plugin形式调用
    return Promise.reject(err)
  }
)
//检测是不是json字符串
function isJsonString(str) {
  try {
    if (typeof JSON.parse(str) == "object") {
      return true;
    }
  } catch (e) {}
  return false;
}

//请求响应器
axios.interceptors.response.use(
  response => {
    if (!!response.data.d) { //黄鑫的接口
      if (response.data.d && response.data.d !== undefined) {
        Vue.$vux.loading.hide()
        if (!!response.data.d.Success) {
          if (isJsonString(response.data.d.Data)) {
            return Promise.resolve(JSON.parse(response.data.d.Data));
          } else {
            return Promise.resolve(response.data.d.Data);
          }
        } else {
          Vue.$vux.toast.text(response.data.d.Message, 'top')
          return Promise.resolve(response.data.d); //增加对错误的处理改正
        }
      }
    } else { //丘堃的接口
      if (response.status === 200) {
        Vue.$vux.loading.hide()
        return Promise.resolve(response.data);
      }
    }
  },
  err => {
    Vue.$vux.loading.hide()
    console.log(err)
    Vue.$vux.toast.text('请求失败，请稍后再试', 'top')
    return Promise.reject(err)
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
