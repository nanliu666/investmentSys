import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router'
import App from './App'
import axios from 'axios'
import _ from 'lodash'
import FastClick from "fastclick"
import {
  PopupPicker
} from 'vux'
Vue.component('popup-picker', PopupPicker)
Vue.prototype.$http = axios
Vue.prototype._ = _

// 解决点击延迟300ms
if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function() {
      FastClick.attach(document.body);
  }, false);
}

//页面位置保存
Vue.use(VueRouter)
const router = new VueRouter({
  routes,
  mode: 'history',
  strict: process.env.NODE_ENV !== 'production',
  scrollBehavior(to, from, savedPosition) {
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
  components: {
    App
  },
  template: '<App/>'
})
