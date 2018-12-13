
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/js/rem'
// 按需引入element-ui
import { Cascader } from 'element-ui'
Vue.use(Cascader)



new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
