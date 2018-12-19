
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import router from './router'
import _ from 'lodash'
import { PopupPicker } from 'vux'
Vue.component('popup-picker', PopupPicker)
Vue.prototype.$http = axios
Vue.prototype._ = _


new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
