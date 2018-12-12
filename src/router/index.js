import Vue from 'vue'
import Router from 'vue-router'
import components from "./components"

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
      path: '/login',
      name: 'login',
      component: components.login
    }]
})
