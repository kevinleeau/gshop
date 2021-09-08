// 向外导出：直接更新state多个方法的对象
import { RECEIVE_ADDRESS, RECEIVE_CATEGORIES, RECEIVE_SHOPS } from './mutation-types'
export default {
  [RECEIVE_ADDRESS] (state, {address}) {
    state.address = address
  },
  [RECEIVE_CATEGORIES] (state, {categories}) {
    state.categories = categories
  },
  [RECEIVE_SHOPS] (state, {shops}) {
    state.shops = shops
  }
}
