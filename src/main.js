import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import Cookies from 'js-cookie'
import './permission' // permission control
//导入自定义指令
import install from './directive'
Vue.use(install)
Vue.config.productionTip = false
Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
