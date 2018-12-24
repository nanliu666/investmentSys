/**
 * 过滤器
 *
 */
import moment from 'moment'
//格式化日期YYY-MM-DD
let dataFrm = date => {
  return moment(date).format("YYYY-MM-DD")
}
//截取第一个字符串
let strSubstring = str => {
  return str.substring(0,1)
}
export {
  dataFrm,
  strSubstring,
}
