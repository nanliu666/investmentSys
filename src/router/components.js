// 路由懒加载
const login = resolve => require(['@/page/login'], resolve);
const index = resolve => require(['@/page/index'], resolve);
const unitOption = resolve => require(['@/page/unitInfo/unitInfoOption'], resolve);
const unitAll = resolve => require(['@/page/unitInfo/unitInfoALL'], resolve);
const reserve = resolve => require(['@/page/unitInfo/reserve'], resolve);
const businessAdd = resolve => require(['@/page/business/businessAdd'], resolve);
const businessDetail = resolve => require(['@/page/business/businessDetail'], resolve);
const businessList = resolve => require(['@/page/business/businessList'], resolve);

export default {
  login,
  index,
  unitOption,
  unitAll,
  reserve,
  businessAdd,
  businessDetail,
  businessList,
}
