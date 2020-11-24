import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//导入自定义指令
import install from './directive'
Vue.use(install)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
