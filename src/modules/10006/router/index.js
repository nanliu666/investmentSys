import App from '../App'






// 合同模块
const contractDetail = resolve => require(['../page/contract/contractDetail'], resolve);
const contractList = resolve => require(['../page/contract/contractList'], resolve);


export default [{
    path: '',
    redirect: '/contractList'
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
]
