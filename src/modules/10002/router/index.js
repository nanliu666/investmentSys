import App from '../App'

//事务模块
const affairList = resolve => require(['../page/affair/affairList'], resolve);
const affairDetail = resolve => require(['../page/affair/affairDetail'], resolve);
//单元模块
const unitInfoALL = resolve => require(['../page/unitInfo/unitInfoALL'], resolve);
const unitInfoAllMap = resolve => require(['../page/unitInfo/unitInfoAllMap'], resolve);

//预定模块
const reserveList = resolve => require(['../page/reserve/reserveList'], resolve);
const reserveDetail = resolve => require(['../page/reserve/reserveDetail'], resolve);
const reserveRemark = resolve => require(['../page/reserve/reserveRemark'], resolve);
const reserveAdd = resolve => require(['../page/reserve/reserveAdd'], resolve);
const reserveAddFromUint = resolve => require(['../page/reserve/reserveAddFromUint'], resolve);

// 商机模块
const businessAdd = resolve => require(['../page/business/businessAdd'], resolve);
const businessDetail = resolve => require(['../page/business/businessDetail'], resolve);
const businessList = resolve => require(['../page/business/businessList'], resolve);
const businessTrackList = resolve => require(['../page/business/children/businessTrackList'], resolve);
const businessTackAdd = resolve => require(['../page/business/children/businessTackAdd'], resolve);

// 客户模块
const clientList = resolve => require(['../page/client/clientList'], resolve);
const clientAdd = resolve => require(['../page/client/clientAdd'], resolve);
const clientDetail = resolve => require(['../page/client/clientDetail'], resolve);

// 合同模块
const contractDetail = resolve => require(['../page/contract/contractDetail'], resolve);
const contractList = resolve => require(['../page/contract/contractList'], resolve);


// 工作流审批流程
const addSign = resolve => require(['../page/workFlow/addSign'], resolve);
const workFlowSubmit = resolve => require(['../page/workFlow/workFlowSubmit'], resolve);
const WorkFlowReject = resolve => require(['../page/workFlow/WorkFlowReject'], resolve);
const WorkFlowAgree = resolve => require(['../page/workFlow/WorkFlowAgree'], resolve);

const notFound = resolve => require(['../page/404/notFound'], resolve);

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

    //事务管理模块
    {
      path: '/affairList', //事务列表
      component: affairList,
      name: 'affairList',
      meta: {
        keepAlive: true,
        isBack: false
      }
    },
    {
      path: '/affairDetail/:id', //事务详情审批
      component: affairDetail,
      name: 'affairDetail'
    },


    //单元模块
    {
      path: '/unitInfoALL', //单元信息所有
      name: 'unitInfoALL',
      component: unitInfoALL,
    },
    {
      path: '/unitInfoAllMap', //单元信息平面图
      name: 'unitInfoAllMap',
      component: unitInfoAllMap,
    },


    //商机模块
    {
      path: '/businessAdd', //新增商机
      name: 'businessAdd',
      component: businessAdd,
    },
    {
      path: '/businessDetail/:id', //商机详情
      name: 'businessDetail',
      component: businessDetail,
    },
    {
      path: '/businessTrackList/:id', //商机跟踪记录
      name: 'businessTrackList',
      component: businessTrackList,
    },
    {
      path: '/businessTackAdd', //商机跟踪记录新增
      name: 'businessTackAdd',
      component: businessTackAdd,
    },
    {
      path: '/businessList', //商机管理
      name: 'businessList',
      component: businessList,
    },

    //客户模块
    {
      path: '/clientList', //客户列表
      name: 'clientList',
      component: clientList,
    },
    {
      path: '/clientAdd', //客户新增
      name: 'clientAdd',
      component: clientAdd,
    },

    {
      path: '/clientDetail/:id', //客户详情
      name: 'clientDetail',
      component: clientDetail,
      meta: {
        keepAlive: true, //此组件需要被缓存
        isBack: false
      }
    },

    //合同模块
    {
      path: '/contractDetail/:id', //合同详情
      name: 'contractDetail',
      component: contractDetail,
    },
    {
      path: '/contractList', //合同列表
      name: 'contractList',
      component: contractList,
    },

    //预定模块
    {
      path: '/reserveList', //预定列表
      name: 'reserveList',
      component: reserveList,
      meta: {
        keepAlive: true,
        isBack: false
      }
    },
    {
      path: '/reserveDetail/:id', //预定详情
      name: 'reserveDetail',
      component: reserveDetail,
      meta: {
        isLoad: false, //是否需要重载
      }
    },
    {
      path: '/reserveRemark', //预定详情备注
      name: 'reserveRemark',
      component: reserveRemark,
    },

    {
      path: '/reserveAdd', //预定新增
      name: 'reserveAdd',
      component: reserveAdd,
    },
    {
      path: '/reserveAddFromUint', //预定新增
      name: 'reserveAddFromUint',
      component: reserveAddFromUint,
    },

  ]
}]
