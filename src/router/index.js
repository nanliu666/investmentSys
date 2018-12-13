import Vue from 'vue'
import Router from 'vue-router'
import components from "./components"

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    // 登陆模块
    {
      path: '/login',
      name: 'login',
      component: components.login
    },
    //单元信息选择
    {
      path: '/unit',
      name: 'unitOption',
      component: components.unitOption,
    },
    //单元信息所有
    {
      path: '/unitAll',
      name: 'unitAll',
      component: components.unitAll,
    },
  ]
})
