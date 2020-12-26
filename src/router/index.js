import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/index',
    children:[
      {
        path: "/index",
        name: 'Index',
        component: () =>import('../views/page/Index')
      },
      {
        path: '/lost',
        name: 'lost',
        component: () =>import('../views/page/Lost.vue')
      },
      {
        path: '/take',
        name: 'take',
        component: () =>import('../views/page/Take.vue')
      },
      {
        path: '/message',
        name: 'message',
        component: () =>import('../views/page/Message.vue')
      },
      {
        path: '/save-goods',
        name: 'saveGoods',
        component: () => import('../views/page/SaveGoods.vue')
      },
      {
        path: '/save-message',
        name: '/saveMessage',
        component: () =>import('../views/page/SaveMessage.vue')
      },
      {
        path: '/search',
        name: 'search',
        component: () =>import('../views/page/Search.vue')
      },
      {path: '/goods/info',name: '/info',component: () =>import('../views/page/GoodsInfo.vue')}
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  /**
   *  登录页
   */
  {
    path: '/login',
    name: 'login',
    component: () =>import('../views/Login.vue')
  },
  /**
   * 管理员后台
   */
  {
    path: '/admin',
    name: 'admin',
    component: () =>import('../views/page/Admin.vue'),
    children:[
      {
        path: '/admin/auth',
        name: 'auth',
        component: () =>import('../views/page/admin/Auth.vue')
      },
      {
        path: '/admin/dict-data',
        name: 'DictData',
        component: () =>import('../views/page/admin/DictData.vue')
      },
      {
        path: '/admin/dict-type',
        name: '/DictType',
        component: () =>import('../views/page/admin/DictType.vue')
      },
      {
        path: '/admin/goods',
        name: 'Goods',
        component: () =>import('../views/page/admin/Goods.vue')
      },
      {
        path: '/admin/goods-message',
        name: 'GoodsMessage',
        component: () =>import('../views/page/admin/GoodsMessage.vue')
      },
      {
        path: '/admin/menu',
        name: 'Menu',
        component: () =>import('../views/page/admin/Menu.vue')
      },
      {
        path: '/admin/message',
        name: 'Message',
        component: () =>import('../views/page/admin/Message.vue')
      },
      {
        path: '/admin/role',
        name: 'Role',
        component: ()=>import('../views/page/admin/Role.vue')
      },
      {
        path: '/admin/sensitive-word',
        name: 'SensitiveWord',
        component: ()=>import('../views/page/admin/SensitiveWord.vue')
      },
      {
        path: '/admin/user',
        name: 'User',
        component: ()=>import('../views/page/admin/User.vue')
      },
      {
        path: '/admin/personal',
        name: 'AdminPersonal',
        component: () =>import('../views/page/user/Personal.vue')
      },
      {
        path: '/admin/cate',
        name: 'Cate',
        component: () => import('../views/page/admin/Cate.vue')
      }
    ]
  },
  /**
   * 用户中心
   */
  {
    path: '/user',
    name: 'user',
    component: () =>import('../views/page/User.vue'),
    children:[
      {
        path: '/personal',
        name: 'UserPersonal',
        component: () =>import('../views/page/user/Personal.vue')
      },
      {
        path: '/my-goods',
        name: 'MyGoods',
        component: () =>import('../views/page/user/MyGoods.vue')
      },
      {
        path: '/my-message',
        name: 'MyMessage',
        component: () =>import('../views/page/user/MyMessage.vue')
      },
      {
        path: '/leaving-message',
        name: 'LeavingMessage',
        component: () =>import('../views/page/user/LeavingMessage.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history', // 去掉url中的#
  routes
})

export default router
