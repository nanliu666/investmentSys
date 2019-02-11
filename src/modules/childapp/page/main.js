import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router'
import App from './App'
import store from './store/index'
import * as filters from './assets/js/filters'
import _ from './assets/js/lodash' //loadsh待改进
Vue.prototype._ = _
import VueClipboard from 'vue-clipboard2';
Vue.use(VueClipboard)
//注册到vue原型上
//暂时解决 vue-loader 打包太大
import {
  DatetimePlugin
} from 'vux'
import ToastPlugin from 'vux/src/plugins/toast/index.js'
import PopupPicker from 'vux/src/components/popup-picker/index.vue'
import {
  LoadingPlugin
} from 'vux'
Vue.use(DatetimePlugin)
Vue.use(LoadingPlugin)
Vue.use(ToastPlugin)
Vue.use(PopupPicker)
// 解决点击延迟300ms
if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function (event) {
    // 判断默认行为是否可以被禁用
    if (event.cancelable) {
      // 判断默认行为是否已经被禁用
      if (!event.defaultPrevented) {
        // event.preventDefault();
        FastClick.attach(document.body);
      }
    }
  }, false);
}

//全局过滤器使用
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

//绝对路径
Vue.prototype.toAbsURL = function (url) {
  var a = document.createElement('a');
  a.href = url;
  return a.href;
};



//页面位置保存
Vue.use(VueRouter)
const router = new VueRouter({
  routes,
  // mode: 'history',
  strict: process.env.NODE_ENV !== 'production',
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      // 模拟锚点滚动
      return {
        selector: to.hash
      }
    }
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop;
      }
      return {
        x: 0,
        y: to.meta.savedPosition || 0
      }
    }
  }
})
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})