// 路由懒加载
const login = resolve => require(['@/page/login'], resolve);
const unitOption = resolve => require(['@/page/unitInfo/unitInfoOption'], resolve);

export default {
  login,
  unitOption,
}
