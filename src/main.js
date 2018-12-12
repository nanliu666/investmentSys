
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/js/rem'




new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
