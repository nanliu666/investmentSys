/**
 * 过滤器
 *
*/
import moment from 'moment'

let dataFrm = date =>{
  return moment(date).format("YYYY-MM-DD")
}
export {dataFrm}
