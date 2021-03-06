import {
  TO_PAGE_NAME,
  FROM_PAGE_NAME,
  RESERVEADD,
  LOGIN_NAME,
  RESAVESCORLLTOP,
  CLIENT_DETAIL,
  UINT_DETAIL,
} from './mutation-types.js'
import _ from '../assets/js/lodash'
export default {
  [TO_PAGE_NAME](state, value) {
    state.toPageName = value
  },
  //登陆名称
  [LOGIN_NAME](state, value) {
    state.loginname = value
  },
  [FROM_PAGE_NAME](state, value) {
    state.formPageName = value
  },
  [CLIENT_DETAIL](state, value) {
    state.clientDetail = value
  },
  [UINT_DETAIL](state, value) {
    state.uintDetailList = value
  },
  [RESERVEADD](state, value) {
    state.reserveObj = value
  },
  [RESAVESCORLLTOP](state, value) {
    state.scrollTop = value
  },
}
