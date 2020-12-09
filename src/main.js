import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import Cookies from 'js-cookie'
import './permission' // permission control
import {parseTime} from '@/utils/DateFormat'
import { ElementTiptapPlugin } from 'element-tiptap';
// 引入 ElementUI 样式
import 'element-ui/lib/theme-chalk/index.css';
// import element-tiptap 样式
import 'element-tiptap/lib/index.css';

// 安装 element-tiptap 插件
Vue.use(ElementTiptapPlugin, {
  lang: "zh", // 见 i18n
  spellcheck: true, // 可被 editor 同名 prop 重写
});
// 现在你已经在全局注册了 `el-tiptap` 组件。
//导入自定义指令
import install from './directive'
Vue.use(install)
Vue.prototype.parseTime = parseTime
Vue.config.productionTip = false
Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
