import App from '../App'
const login = resolve => require(['@/page/login'], resolve);
const home = resolve => require(['@/page/index'], resolve);
//单元模块
const unitOption = resolve => require(['@/page/unitInfo/unitInfoOption'], resolve);
const unitAll = resolve => require(['@/page/unitInfo/unitInfoALL'], resolve);

//预定模块
const reserve = resolve => require(['@/page/reserve/reserve'], resolve);

// 商机模块
const businessAdd = resolve => require(['@/page/business/businessAdd'], resolve);
const businessDetail = resolve => require(['@/page/business/businessDetail'], resolve);
const businessList = resolve => require(['@/page/business/businessList'], resolve);

// 客户模块
const clientList = resolve => require(['@/page/client/clientList'], resolve);

export default [{
  path: '/',
  component: App, //顶层路由，对应index.html
  children: [ //二级路由。对应App.vue
    //地址为空时跳转home页面
    {
      path: '',
      redirect: '/home'
    },
    //首页
    {
      path: '/home',
      component: home
    },
    //登陆
    {
      path: '/login',
      component: login
    },
    //单元信息选择
    {
      path: '/unit',
      name: 'unitOption',
      component: unitOption,
    },
    //单元信息所有
    {
      path: '/unitAll',
      name: 'unitAll',
      component: unitAll,
    },
    //单元信息所有
    {
      path: '/reserve',
      name: 'reserve',
      component: reserve,
    },
    //新增商机
    {
      path: '/businessAdd',
      name: 'businessAdd',
      component: businessAdd,
    },
    //商机详情
    {
      path: '/businessDetail/:id',
      name: 'businessDetail',
      component: businessDetail,
    },
    //商机管理
    {
      path: '/businessList',
      name: 'businessList',
      component: businessList,
    },

    //客户列表
    {
      path: '/clientList',
      name: 'clientList',
      component: clientList,
    },

  ]
}]
