import {
  TO_PAGE_NAME,
  FROM_PAGE_NAME,
  RESERVEADD,
  CLIENT_DETAIL
} from './mutation-types.js'
export default {
  [TO_PAGE_NAME](state, value) {
    state.toPageName = value
  },
  [FROM_PAGE_NAME](state, value) {
    state.formPageName = value
  },
  [CLIENT_DETAIL](state, value) {
    state.clientDetail = value
  },
  [RESERVEADD](state, value) {
    state.reserveObj = value
  },
}
