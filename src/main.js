import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router'
import App from './App'
import axios from 'axios'
import _ from 'lodash'
import * as filters from './assets/js/filters'
import FastClick from "fastclick" // 解决点击延迟300ms
import animate from 'animate.css'
import {
  PopupPicker
} from 'vux'
Vue.component('popup-picker', PopupPicker)
Vue.prototype.$http = axios
Vue.prototype._ = _
Vue.use(animate)

// 解决点击延迟300ms
if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function() {
      FastClick.attach(document.body);
  }, false);
}

//全局过滤器使用
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

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
