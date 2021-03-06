import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions.js'
import mutations from './mutations.js'
import getters from './getters.js'

Vue.use(Vuex)

// 存放着组件中信息的状态
const state = {
  toPageName: '', //页面返回的路由名字
  loginname: '', //用户名称
  formPageName: '', //页面来的路由名字
  clientDetail: '', //获取的联系人详情
  uintDetailList: [], //获取单元列表
  reserveObj: '', //获取预订新增的暂存对象
  scrollTop: '' //记录高度
}



export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
})
