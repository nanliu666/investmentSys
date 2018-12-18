
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import router from './router'
// import './assets/js/flexble'
// import 'lib-flexible'
import { PopupPicker } from 'vux'
Vue.component('popup-picker', PopupPicker)
Vue.prototype.$http = axios


new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
