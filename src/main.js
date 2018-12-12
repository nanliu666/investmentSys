
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/js/layout' // 全局使用js自适应


new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
