import App from '../App'

//事务模块
const affairList = resolve => require(['../page/affair/affairList'], resolve);
const affairDetail = resolve => require(['../page/affair/affairDetail'], resolve);


// 工作流审批流程
const addSign = resolve => require(['../page/workFlow/addSign'], resolve);
const workFlowSubmit = resolve => require(['../page/workFlow/workFlowSubmit'], resolve);
const WorkFlowReject = resolve => require(['../page/workFlow/WorkFlowReject'], resolve);
const WorkFlowAgree = resolve => require(['../page/workFlow/WorkFlowAgree'], resolve);


export default [{
  path: '/',
  component: App, //顶层路由，对应index.html
  children: [ //二级路由。对应App.vue

    {
      path: '',
      redirect: '/affairList'
    },


    //工作流模块
    {
      path: '/addSign/:id', //审批加签
      component: addSign,
      name: 'addSign'
    },
    {
      path: '/workFlowSubmit/:id', //提交
      component: workFlowSubmit,
      name: 'workFlowSubmit'
    },
    {
      path: '/WorkFlowReject/:id', //审批驳回
      component: WorkFlowReject,
      name: 'WorkFlowReject'
    },
    {
      path: '/WorkFlowAgree/:id', //审批同意
      component: WorkFlowAgree,
      name: 'WorkFlowAgree'
    },

    // //事务管理模块
    {
      path: '/affairList', //事务列表
      component: affairList,
      name: 'affairList',
      // meta: {
      //   keepAlive: true,
      //   isBack: false
      // }
    },
    {
      path: '/affairDetail/:id', //事务详情审批
      component: affairDetail,
      name: 'affairDetail'
    },




  ]
}]
