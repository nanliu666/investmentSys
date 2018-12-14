
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import router from './router'
// import './assets/js/rem'
import './assets/js/flexble'
import 'lib-flexible'
// 按需引入element-ui
import { Cascader } from 'element-ui'
Vue.use(Cascader)
Vue.prototype.$http = axios


new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
