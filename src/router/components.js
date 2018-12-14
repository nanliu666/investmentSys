// 路由懒加载
const login = resolve => require(['@/page/login'], resolve);
const unitOption = resolve => require(['@/page/unitInfo/unitInfoOption'], resolve);
const unitAll = resolve => require(['@/page/unitInfo/unitInfoALL'], resolve);
const reserve = resolve => require(['@/page/unitInfo/reserve'], resolve);

export default {
  login,
  unitOption,
  unitAll,
  reserve,
}
