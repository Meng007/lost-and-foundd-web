import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children:[
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
        component: () => import('../views/page/SaveMessage.vue')
      },
      {
        path: '/save-message',
        name: '/saveMessage',
        component: () =>import('../views/page/SaveMessage.vue')
      }
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
        path: '/auth',
        name: 'auth',
        component: () =>import('../views/page/admin/Auth.vue')
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
        name: 'personal',
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
