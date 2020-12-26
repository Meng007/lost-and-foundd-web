import Vue from 'vue'
import Vuex from 'vuex'
import { constantRoutes } from '@/router'
import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user:{
      onLink: false,
      token: getToken(),
      nickName: '',
      userType: '',
      avatar: '',
      roles: [],
      permissions: []
    },
    routes: [],
    addRoutes: []
  },
  mutations: {
    SET_ROUTES: (state, routes) => {
      state.addRoutes = routes
      state.routes = constantRoutes.concat(routes)
    },
    SET_USER_TYPE: (state,type) =>{
      state.user.userType = type
    },
    SET_TOKEN: (state, token) => {
      state.user.token = token
    },
    SET_NAME: (state, name) => {
      state.user.nickName = name
    },
    SET_AVATAR: (state, avatar) => {
      state.user.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.user.roles = roles
    },
    SET_PERMISSIONS: (state, permissions) => {
      state.user.permissions = permissions
    },
    SET_ONLINK: (state,flag) =>{
      state.user.onLink = flag
    }
  },
  actions: {
   /* GenerateRoutes({ commit }) {
      return new Promise(resolve => {
        // 向后端请求路由数据
        getRouters().then(res => {
          const accessedRoutes = filterAsyncRouter(res.data)
          accessedRoutes.push({ path: '*', redirect: '/404', hidden: true })
          commit('SET_ROUTES', accessedRoutes)
          resolve(accessedRoutes)
        })
      })
    },*/
    //登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      const password = userInfo.password
      return new Promise((resolve, reject) => {
        login(username, password).then(res => {
          setToken(res.data.token)
          commit('SET_TOKEN', res.data.token)
          commit('SET_ONLINK',true)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.user.token).then(res => {
          const user = res.data.user
          const avatar = user.avatar == null ? require("@/assets/image/profile.jpg") : process.env.VUE_APP_BASE_API + user.avatar;
          if (res.roles && res.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', res.roles)
            commit('SET_PERMISSIONS', res.permissions)
          } else {
            commit('SET_ROLES', ['ROLE_DEFAULT'])
          }
          //设置昵称
          commit('SET_NAME', user.nickName)
          //设置头像
          commit('SET_AVATAR', avatar)
          //修改在线
          commit('SET_ONLINK', true)
          //设置角色
          commit('SET_ROLES',res.data.roles)
          //设置权限
          commit('SET_PERMISSIONS',res.data.permissions)
          //设置用户类型
          commit('SET_USER_TYPE',user.userType)
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },

    //头像修改后更新
    SetAvatarUrl({commit},url){
      commit('SET_AVATAR',url)
    },

    // 退出系统
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.user.token).then(res => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          commit('SET_ONLINK', false)
          commit('SET_PERMISSIONS', [])
          removeToken(res)
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    },

    //设置角色

  },
  modules: {
  },
  getters:{
    onLink: state => state.user.onLink,
    roles: state => state.user.roles,
    userType: state => state.user.userType
  }
})

// 遍历后台传来的路由字符串，转换为组件对象
/*
function filterAsyncRouter(asyncRouterMap) {
  return asyncRouterMap.filter(route => {
    if (route.component) {
      // Layout组件特殊处理
      if (route.component === 'Layout') {
        route.component = Layout
      } else {
        route.component = loadView(route.component)
      }
    }
    if (route.children != null && route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children)
    }
    return true
  })
}

export const loadView = (view) => { // 路由懒加载
  return (resolve) =>  require([`@/views/${view}`], resolve)
}
*/
