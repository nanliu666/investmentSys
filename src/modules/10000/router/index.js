import App from '../App'
//首页模块
const home = resolve => require(['../page/home'], resolve);
const homeNew = resolve => require(['../page/homeNew'], resolve);
const homeAffairDetail = resolve => require(['../page/homeAffairDetail'], resolve);


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
     {
      path: '/homeAffairDetail', //信息列表
      component: homeAffairDetail,
      name: 'homeAffairDetail'
    },
  ]
}]
