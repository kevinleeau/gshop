import Vue from 'vue'
import { Button } from 'mint-ui'
import App from './App.vue'
import router from '@/router/index.js'
import store from '@/store/index.js'
// 引入mini-ui的button，并注册为全局可使用组件，名为<mt-button>
Vue.component(Button.name, Button)

export default new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
