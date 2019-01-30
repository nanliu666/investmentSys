import App from '../App'
//首页模块
const home = resolve => require(['@/page/home/home'], resolve);
const homeNew = resolve => require(['@/page/home/homeNew'], resolve);

//事务模块
const affairList = resolve => require(['@/page/affair/affairList'], resolve);
const affairDetail = resolve => require(['@/page/affair/affairDetail'], resolve);
//单元模块
const unitInfoALL = resolve => require(['@/page/unitInfo/unitInfoALL'], resolve);

//预定模块
const reserveList = resolve => require(['@/page/reserve/reserveList'], resolve);
const reserveDetail = resolve => require(['@/page/reserve/reserveDetail'], resolve);
const reserveAdd = resolve => require(['@/page/reserve/reserveAdd'], resolve);
const reserveAddFromUint = resolve => require(['@/page/reserve/reserveAddFromUint'], resolve);

// 商机模块
const businessAdd = resolve => require(['@/page/business/businessAdd'], resolve);
const businessDetail = resolve => require(['@/page/business/businessDetail'], resolve);
const businessList = resolve => require(['@/page/business/businessList'], resolve);
const businessTrackList = resolve => require(['@/page/business/children/businessTrackList'], resolve);
const businessTackAdd = resolve => require(['@/page/business/children/businessTackAdd'], resolve);

// 客户模块
const clientList = resolve => require(['@/page/client/clientList'], resolve);
const clientAdd = resolve => require(['@/page/client/clientAdd'], resolve);
const clientDetail = resolve => require(['@/page/client/clientDetail'], resolve);

// 合同模块
const contractDetail = resolve => require(['@/page/contract/contractDetail'], resolve);
const contractList = resolve => require(['@/page/contract/contractList'], resolve);

const notFound = resolve => require(['@/page/404/notFound'], resolve);

export default [{
  path: '/',
  component: App, //顶层路由，对应index.html
  children: [ //二级路由。对应App.vue
    //地址为空时跳转home页面
    {
      path: '',
      redirect: '/home'
    },
    //首页模块
    {
      path: '/home', //首页
      component: home,
      name: 'home'
    },
    {
      path: '/homeNew', //信息列表
      component: homeNew,
      name: 'homeNew'
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
      // meta: { //单元信息所有的模块的keepalive有问题
      //   keepAlive: true,
      //   isBack: false
      // }
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
      meta: {
        keepAlive: true,
        isBack: false
      }
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
      meta: {
        keepAlive: true,
        isBack: false
      }
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

    {
      name: '404',
      path: '/404',
      component: notFound,
    },
    {
      path: '*', // 此处需特别注意至于最底部
      redirect: '/404'
    }


  ]
}]
