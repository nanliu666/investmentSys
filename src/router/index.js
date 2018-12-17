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
    //单元信息所有
    {
      path: '/reserve',
      name: 'reserve',
      component: components.reserve,
    },
    //新增商机
    {
      path: '/businessAdd',
      name: 'businessAdd',
      component: components.businessAdd,
    },
    //商机详情
    {
      path: '/businessDetail',
      name: 'businessDetail',
      component: components.businessDetail,
    },
    //商机管理
    {
      path: '/businessList',
      name: 'businessList',
      component: components.businessList,
    },

  ]
})
